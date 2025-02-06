import React, { useEffect } from "react";
import Button from "@atlaskit/button";
import Tooltip from "@atlaskit/tooltip";
import {
  AtlassianNavigation,
  Create,
  CustomProductHome,
  Notifications,
  PrimaryButton,
  PrimaryDropdownButton,
  Profile,
  Search,
} from "@atlaskit/atlassian-navigation";
import { NotificationIndicator } from "@atlaskit/notification-indicator";

import Avatar from "@atlaskit/avatar";
import { Fragment, useState } from "react";
import {
  ButtonItem,
  Footer,
  Header,
  NavigationFooter,
  NavigationHeader,
  NestableNavigationContent,
  NestingItem,
  Section,
  SideNavigation,
} from "@atlaskit/side-navigation";
import {
  Content,
  LeftSidebar,
  Main,
  PageLayout,
  TopNavigation,
} from "@atlaskit/page-layout";
import Icon from "@atlaskit/icon";
import FilterIcon from "@atlaskit/icon/glyph/filter";
import LightbulbIcon from "@atlaskit/icon/glyph/lightbulb";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import LanguageIcon from "@atlaskit/icon/glyph/world";
import MarketplaceIcon from "@atlaskit/icon/glyph/marketplace";
import EmojiFoodIcon from "@atlaskit/icon/glyph/emoji/food";
import OfficeBuildingIcon from "@atlaskit/icon/glyph/office-building";
import PeopleGroupIcon from "@atlaskit/icon/glyph/people-group";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setGlobalTheme } from "@atlaskit/tokens";
import Toggle from "@atlaskit/toggle";
import { Box, xcss } from "@atlaskit/primitives";
import { useDispatch } from "react-redux";
import { logout } from "../../Features/auth/authThunk";
import { MenuGroup } from "@atlaskit/menu";
import Popup from "@atlaskit/popup";

import SignOutIcon from "@atlaskit/icon/glyph/sign-out";
import UserAvatarCircleIcon from "@atlaskit/icon/glyph/user-avatar-circle";

import Logo from "../../images/kybo_logo.png";

const avatarUrl =
  "data:image/png;base64,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";

const AtlassianProductHome = () => {
  const { t } = useTranslation("general");
  return (
    <CustomProductHome
      href="/"
      logoUrl={Logo}
      logoMaxWidth={300}
      siteTitle={t("siteTitle")}
    />
  );
};

const CreateButton = () => {
  const { t } = useTranslation("nav_bar");
  return (
    <Create
      buttonTooltip={t("tooltip.create_new_order")}
      iconButtonTooltip={t("tooltip.create_new_order")}
      text={t("newOrder")}
      href=""
    />
  );
};

const DefaultProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("nav_bar");

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const contentStyles = xcss({
    padding: "space.200",
  });
  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      content={() => (
        <Box xcss={contentStyles}>
          <MenuGroup>
            <Section aria-labelledby="actions">
              <ButtonItem
                iconBefore={
                  <UserAvatarCircleIcon label={t("profile.profile")} />
                }
              >
                {t("profile.profile")}
              </ButtonItem>
              <ButtonItem
                iconBefore={<SignOutIcon label={t("profile.profile")} />}
                onClick={handleLogout}
              >
                {t("profile.logout")}
              </ButtonItem>
            </Section>
          </MenuGroup>
        </Box>
      )}
      trigger={(triggerProps) => (
        <Profile
          {...triggerProps}
          icon={<Avatar size="small" src={avatarUrl} />}
          onClick={() => setIsOpen(!isOpen)}
          tooltip={t("tooltip.yourProfileAndSettings")}
        />
      )}
    />
  );
};

const DefaultSearch = () => {
  const { t } = useTranslation("nav_bar");
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Search
      onClick={onChange}
      placeholder={t("search")}
      tooltip={t("search")}
      label={t("search")}
      value={value}
    />
  );
};

function Home() {
  const { t, i18n } = useTranslation("nav_bar");
  const { t: tSide } = useTranslation("side_bar");
  const { t: tGeneral } = useTranslation("general");
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const [themeMode, setThemeMode] = useState("dark");

  useEffect(() => {
    setGlobalTheme({
      light: "",
      dark: "dark",
      colorMode: themeMode,
    });
  }, [themeMode]);

  const handleToggleChange = (e) => {
    setThemeMode(e.target.checked ? "dark" : "");
  };

  const NotificationsBadge = () => {
    return (
      <NotificationIndicator notificationLogProvider={Promise.resolve({})} />
    );
  };

  const PrimaryItems = [
    <PrimaryButton key="orders">{t("orders")}</PrimaryButton>,
    <PrimaryDropdownButton key="products">
      {t("products")}
    </PrimaryDropdownButton>,
    <PrimaryDropdownButton key="masters">{t("masters")}</PrimaryDropdownButton>,
    <div
      key="toggle"
      style={{ display: "flex", alignItems: "center", padding: "0 8px" }}
    >
      <Toggle
        id="toggle-theme"
        isChecked={themeMode === "dark"}
        onChange={handleToggleChange}
      />
      <span style={{ marginLeft: 4 }}>
        {themeMode === "light" ? tGeneral("lightMode") : tGeneral("darkMode")}
      </span>
    </div>,
  ];
  const { token } = useSelector((state) => state.auth);
  return (
    <>
      <PageLayout
        onLeftSidebarExpand={(state) => console.log("onExpand", state)}
        onLeftSidebarCollapse={(state) => console.log("onCollapse", state)}
      >
        <TopNavigation>
          <AtlassianNavigation
            label="site"
            primaryItems={PrimaryItems}
            renderCreate={CreateButton}
            renderProductHome={AtlassianProductHome}
            renderProfile={DefaultProfile}
            renderSearch={DefaultSearch}
            renderNotifications={() => {
              return (
                <Notifications
                  badge={NotificationsBadge}
                  tooltip={t("tooltip.notifications")}
                />
              );
            }}
          />
        </TopNavigation>
        <Content testId="content">
          <LeftSidebar
            testId="left-sidebar"
            id="left-sidebar"
            skipLinkTitle="Project Navigation"
            isFixed={true}
            onResizeStart={(state) => console.log("onResizeStart", state)}
            onResizeEnd={(state) => console.log("onResizeEnd", state)}
            onFlyoutExpand={() => console.log("onFlyoutExpand")}
            onFlyoutCollapse={() => console.log("onFlyoutCollapse")}
            resizeGrabAreaLabel="Resize Current project sidebar"
            resizeButtonLabel="Current project sidebar"
            valueTextLabel="Width"
            overrides={{
              ResizeButton: {
                render: (Component, props) => (
                  <Tooltip
                    content={tSide("tooltip.leftSideBar")}
                    hideTooltipOnClick
                    position="right"
                    testId="tooltip"
                  >
                    <Component {...props} />
                  </Tooltip>
                ),
              },
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ width: 280, height: 1000 }}>
                <SideNavigation label="project" testId="side-navigation">
                  <NavigationHeader>
                    <Header description={tSide("sideBarTopSubTitle")}>
                      {tSide("sideBarTopTitle")}
                    </Header>
                  </NavigationHeader>

                  <NestableNavigationContent
                    initialStack={[]}
                    testId="nestable-navigation-content"
                  >
                    <Section>
                      {/* --------------Filter Options------------ */}
                      <NestingItem
                        id="2"
                        testId="filter-nesting-item"
                        title={tSide("filters.filters")}
                        iconBefore={<FilterIcon label="" />}
                        iconAfter={<LightbulbIcon label="" />}
                      >
                        <Section>
                          <ButtonItem>
                            {tSide("filters.searchIssues")}
                          </ButtonItem>
                        </Section>
                        <Section title={tSide("filters.started")}>
                          <ButtonItem>
                            {tSide("filters.everythingMe")}
                          </ButtonItem>
                          <ButtonItem>
                            {tSide("filters.myOpenIssue")}
                          </ButtonItem>
                          <ButtonItem>
                            {tSide("filters.reportedByMe")}
                          </ButtonItem>
                        </Section>
                        <Section hasSeparator title={tSide("filters.other")}>
                          <ButtonItem>{tSide("filters.allIssues")}</ButtonItem>
                          <ButtonItem>{tSide("filters.openIssues")}</ButtonItem>
                          <ButtonItem>
                            {tSide("filters.createdRecently")}
                          </ButtonItem>
                          <ButtonItem>
                            {tSide("filters.resolvedRecently")}
                          </ButtonItem>
                        </Section>
                        <Section hasSeparator>
                          <ButtonItem>
                            {tSide("filters.viewAllFilters")}
                          </ButtonItem>
                        </Section>
                      </NestingItem>

                      {/* --------------Products Options------------ */}
                      <Link
                        to="/product"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <NestingItem
                          id="1"
                          title={tSide("product.productManagement")}
                          iconBefore={<EmojiFoodIcon label="" />}
                        >
                          <Section title={tSide("product.productManagement")}>
                            <Link
                              to="/product"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <ButtonItem>
                                {tSide("product.dashboard")}
                              </ButtonItem>
                            </Link>
                            <Link
                              to="/product"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <ButtonItem>
                                {tSide("product.productList")}
                              </ButtonItem>
                            </Link>
                          </Section>
                          <Section hasSeparator>
                            <ButtonItem>
                              {tSide("product.productManagementOptions")}
                            </ButtonItem>
                          </Section>
                        </NestingItem>
                      </Link>

                      <ButtonItem iconBefore={<MarketplaceIcon label="" />}>
                        {tSide("order.OrderManagement")}
                      </ButtonItem>

                      <ButtonItem iconBefore={<OfficeBuildingIcon label="" />}>
                        {tSide("inventory.inventoryManagement")}
                      </ButtonItem>

                      <ButtonItem iconBefore={<PeopleGroupIcon label="" />}>
                        {tSide("user.userManagement")}
                      </ButtonItem>

                      {/* --------------Language Options------------ */}
                      <NestingItem
                        id="3"
                        iconBefore={<SettingsIcon label="" />}
                        title={tSide("settings.settings")}
                        testId="settings-nesting-item"
                      >
                        <Section>
                          <NestingItem
                            iconBefore={<LanguageIcon label="" />}
                            id="3-1"
                            title={tSide("settings.lSettings")}
                          >
                            <Section>
                              <ButtonItem onClick={() => changeLanguage("en")}>
                                English
                              </ButtonItem>
                              <ButtonItem onClick={() => changeLanguage("jp")}>
                                日本語
                              </ButtonItem>
                              <ButtonItem onClick={() => changeLanguage("si")}>
                                සිංහල
                              </ButtonItem>
                            </Section>
                          </NestingItem>
                        </Section>
                      </NestingItem>
                    </Section>
                  </NestableNavigationContent>

                  <NavigationFooter>
                    <Footer
                      description={
                        <Fragment>
                          <Button
                            appearance="subtle-link"
                            href="/feedback"
                            spacing="none"
                          >
                            {tSide("sideBarBottomTitle1")}
                          </Button>
                          {" ∙ "}
                          <Button
                            appearance="subtle-link"
                            href="/learn"
                            spacing="none"
                          >
                            {tSide("sideBarBottomTitle2")}
                          </Button>
                        </Fragment>
                      }
                      iconBefore={<Icon label="mode" />}
                    >
                      {tSide("sideBarBottomSubTitle")}
                    </Footer>
                  </NavigationFooter>
                </SideNavigation>
              </div>
            </div>
          </LeftSidebar>
          <Main>
            <div style={{ paddingLeft: 20 }}>
              {token ? <Outlet /> : <Navigate to="/login" />}
            </div>
          </Main>
        </Content>
      </PageLayout>
    </>
  );
}

export default Home;
