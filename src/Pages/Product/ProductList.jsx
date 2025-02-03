import React, { Fragment, useEffect, useState } from "react";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/new";
import __noop from "@atlaskit/ds-lib/noop";
import { Box, Inline, xcss } from "@atlaskit/primitives";
import Select from "@atlaskit/select";
import TextField from "@atlaskit/textfield";
import PageHeader from "@atlaskit/page-header";
import DynamicTable from "@atlaskit/dynamic-table";
import TextArea from "@atlaskit/textarea";

import { Checkbox } from "@atlaskit/checkbox";
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import Textfield from "@atlaskit/textfield";

import Form, { CheckboxField, Field } from "@atlaskit/form";

import { useDispatch } from "react-redux";
import { getProduct, storeProduct } from "../../Features/product/productThunk";
import { useSelector } from "react-redux";

const colors = [
  { label: "15.5%", value: "1" },
  { label: "10.5%", value: "2" },
];

// ------------- Start - Page Header -------------
const selectContainerStyles = xcss({
  flex: "0 0 200px",
  marginInlineStart: "space.100",
});

const flexBoxStyles = xcss({
  flex: "0 0 200px",
});

const breadcrumbs = (
  <Breadcrumbs onExpand={__noop}>
    <BreadcrumbsItem text="Product Management" key="Product Management" />
  </Breadcrumbs>
);

const barContent = (
  <Inline>
    <Box xcss={flexBoxStyles}>
      <TextField isCompact placeholder="Filter" aria-label="Filter" />
    </Box>
    <Box xcss={selectContainerStyles}>
      <Select
        spacing="compact"
        placeholder="Choose an option"
        aria-label="Choose an option"
      />
    </Box>
  </Inline>
);
// ------------- End - Page Header -------------

const createHead = (withWidth) => {
  return {
    cells: [
      {
        key: "name",
        content: "Name",
        isSortable: true,
        width: withWidth ? 25 : undefined,
      },
      {
        key: "price",
        content: "Price",
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 15 : undefined,
      },
      {
        key: "more",
        content: "Actions",
        shouldTruncate: true,
      },
    ],
  };
};

const head = createHead(true);

const ProductList = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isDisplay, setIsDisplay] = useState(true);
  const [name, setName] = useState("");
  const [taxID, setTaxID] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");

  const productData = {
    name,
    description,
    price,
    category_id: 1,
    tax_id: taxID,
    main_image: "sample_image.jpg",
    is_stock: true,
    is_display: isDisplay,
    created_by: 1,
    updated_by: 1
  };

  const handleFormSubmit = () => {
    dispatch(storeProduct(productData));
    dispatch(getProduct());
    close();
  };

  const isDisplayHandler = () => {
    setIsDisplay((current) => !current);
  };

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const actionsContent = (
    <ButtonGroup label="Content actions">
      <Button appearance="primary" onClick={open}>
        Add product
      </Button>
      <Button>Share</Button>
      <Button>...</Button>
    </ButtonGroup>
  );

  const { products } = useSelector((state) => state.productData);

  const createRows = (data) => {
    return data.map((product) => ({
      key: product.id,
      cells: [
        { key: "name", content: product.name },
        { key: "price", content: product.price },
        { key: "more", content: <Button>More</Button> },
      ],
    }));
  };

  const rows = products?.data ? createRows(products.data) : [];

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      <PageHeader
        breadcrumbs={breadcrumbs}
        actions={actionsContent}
        bottomBar={barContent}
      >
        Product Management
      </PageHeader>
      <DynamicTable
        head={head}
        rows={rows}
        rowsPerPage={5}
        defaultPage={1}
        loadingSpinnerSize="large"
      />

      <ModalTransition>
        {isOpen && (
          <ModalDialog onClose={close}>
            <Form onSubmit={handleFormSubmit}>
              {({ formProps }) => (
                <form id="form-with-id" {...formProps}>
                  <ModalHeader>
                    <ModalTitle>Add New Product</ModalTitle>
                  </ModalHeader>

                  <ModalBody>
                    <CheckboxField name="products_is_display" defaultIsChecked>
                      {({ fieldProps }) => (
                        <Checkbox
                          {...fieldProps}
                          label="Display"
                          isChecked={isDisplay}
                          onChange={isDisplayHandler}
                        />
                      )}
                    </CheckboxField>

                    <Field
                      label="Product Name"
                      isRequired
                      name="products_name"
                      defaultValue={name}
                    >
                      {({ fieldProps }) => (
                        <Textfield
                          placeholder="Milk Yogurt"
                          {...fieldProps}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      )}
                    </Field>

                    <Field
                      name="products_tax"
                      label="Tax rate"
                      defaultValue={taxID}
                      isRequired
                    >
                      {({ fieldProps: { id, ...rest } }) => (
                        <Select
                          inputId={id}
                          {...rest}
                          options={colors}
                          isClearable
                          value={colors.find((opt) => opt.value === taxID)}
                          onChange={(option) => setTaxID(option?.value || null)}
                        />
                      )}
                    </Field>

                    <Field
                      label="Price"
                      isRequired
                      name="products_price"
                      defaultValue={price}
                    >
                      {({ fieldProps }) => (
                        <Textfield
                          placeholder="80.00"
                          {...fieldProps}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      )}
                    </Field>

                    <Field
                      label="Product Description"
                      name="products_description"
                      defaultValue={description}
                    >
                      {({ fieldProps }) => (
                        <TextArea
                          placeholder="Delicious Milk yogurt"
                          {...fieldProps}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      )}
                    </Field>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={close} appearance="subtle">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      form="form-with-id"
                      appearance="primary"
                    >
                      Submit
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </Form>
          </ModalDialog>
        )}
      </ModalTransition>
    </>
  );
};

export default ProductList;