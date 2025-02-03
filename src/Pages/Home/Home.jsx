import React from "react";
import Button from "@atlaskit/button";
import Tooltip from "@atlaskit/tooltip";
import { AtlassianIcon, AtlassianLogo } from "@atlaskit/logo";
import {
  AtlassianNavigation,
  Create,
  Help,
  Notifications,
  PrimaryButton,
  PrimaryDropdownButton,
  ProductHome,
  Profile,
  Search,
  Settings,
  SignIn,
} from "@atlaskit/atlassian-navigation";
import { NotificationIndicator } from "@atlaskit/notification-indicator";

import Avatar from "@atlaskit/avatar";
import { Fragment, useState } from "react";
import {
  ButtonItem,
  Footer,
  Header,
  LinkItem,
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
import DropboxIcon from "@atlaskit/icon/glyph/dropbox";
import FilterIcon from "@atlaskit/icon/glyph/filter";
import WorkIcon from "@atlaskit/icon/glyph/folder";
import LightbulbIcon from "@atlaskit/icon/glyph/lightbulb";
import CustomerIcon from "@atlaskit/icon/glyph/person";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import LanguageIcon from "@atlaskit/icon/glyph/world";
import { Link, Navigate, Outlet } from "react-router-dom";
import PeopleGroupIcon from "@atlaskit/icon/glyph/people-group";
import { useSelector } from "react-redux";

const avatarUrl =
  "data:image/png;base64,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";

const onClick = (e) => {};

const AtlassianProductHome = () => {
  return (
    <ProductHome
      icon={AtlassianIcon}
      logo={AtlassianLogo}
      siteTitle="Kybo"
      href="/home"
    />
  );
};

const CreateButton = () => {
  return (
    <Create
      buttonTooltip="Create a new order"
      iconButtonTooltip="Create a new order"
      text="New Order"
      href=""
    />
  );
};

const DefaultProfile = () => {
  return (
    <Profile
      icon={<Avatar size="small" src={avatarUrl} />}
      onClick={onClick}
      tooltip="Your profile and settings"
    />
  );
};

const DefaultSearch = () => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Search
      onClick={onChange}
      placeholder="Search..."
      tooltip="Search"
      label="Search"
      value={value}
    />
  );
};

const NotificationsBadge = () => {
  return (
    <NotificationIndicator
      // onCountUpdated={}
      notificationLogProvider={Promise.resolve({})}
    />
  );
};

const DefaultSettings = () => {
  return <Settings tooltip="Product settings" />;
};
const DefaultSignIn = () => {
  return <SignIn href="/" tooltip="Sign in" />;
};

const PrimaryItems = [
  <PrimaryButton>Your work</PrimaryButton>,
  <PrimaryDropdownButton>Issues</PrimaryDropdownButton>,
  <PrimaryDropdownButton>Projects</PrimaryDropdownButton>,
  <PrimaryButton>Recrutment</PrimaryButton>,
];

function Home() {
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
            renderSettings={DefaultSettings}
            renderSignIn={DefaultSignIn}
            renderHelp={() => <Help tooltip="Get help" />}
            renderNotifications={() => {
              return (
                <Notifications
                  badge={NotificationsBadge}
                  tooltip="Notifications"
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
                    content={"Left Sidebar"}
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
                    <Header
                      description="Next-gen service desk"
                      // iconBefore={AtlassianIcon}
                    >
                      NXTGen Industries
                    </Header>
                  </NavigationHeader>

                  <NestableNavigationContent
                    initialStack={[]}
                    testId="nestable-navigation-content"
                  >
                    <Section>
                      <NestingItem
                        id="2"
                        testId="filter-nesting-item"
                        title="Filters"
                        iconBefore={<FilterIcon label="" />}
                        iconAfter={<LightbulbIcon label="" />}
                      >
                        <Section>
                          <ButtonItem>Search issues</ButtonItem>
                        </Section>
                        <Section title="Starred">
                          <ButtonItem>Everything me</ButtonItem>
                          <ButtonItem>My open issues</ButtonItem>
                          <ButtonItem>Reported by me</ButtonItem>
                        </Section>
                        <Section hasSeparator title="Other">
                          <ButtonItem>All issues</ButtonItem>
                          <ButtonItem>Open issues</ButtonItem>
                          <ButtonItem>Created recently</ButtonItem>
                          <ButtonItem>Resolved recently</ButtonItem>
                        </Section>
                        <Section hasSeparator>
                          <ButtonItem>View all filters</ButtonItem>
                        </Section>
                      </NestingItem>
                      <Link
                        to="/product"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <NestingItem
                          id="1"
                          isSelected
                          title="Product Management"
                          iconBefore={<PeopleGroupIcon label="" />}
                        >
                          <Section title="Product Management">
                            <Link
                              to="/product"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <ButtonItem>Dashboard</ButtonItem>
                            </Link>
                            <Link
                              to="/product"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <ButtonItem>Product List</ButtonItem>
                            </Link>
                          </Section>
                          <Section hasSeparator>
                            <ButtonItem>Product Management Options</ButtonItem>
                          </Section>
                        </NestingItem>
                      </Link>
                      <NestingItem
                        id="3"
                        iconBefore={<SettingsIcon label="" />}
                        title="Settings"
                        testId="settings-nesting-item"
                      >
                        <Section>
                          <NestingItem
                            iconBefore={<LanguageIcon label="" />}
                            id="3-1"
                            title="Language settings"
                          >
                            <Section>
                              <ButtonItem>Customize</ButtonItem>
                              <NestingItem id="3-1-1" title="German Settings">
                                <Section>
                                  <ButtonItem>Hallo Welt!</ButtonItem>
                                </Section>
                              </NestingItem>
                              <NestingItem id="3-1-2" title="English Settings">
                                <Section>
                                  <ButtonItem>Hello World!</ButtonItem>
                                </Section>
                              </NestingItem>
                            </Section>
                          </NestingItem>
                        </Section>
                      </NestingItem>

                      <NestingItem
                        id="4"
                        iconBefore={<DropboxIcon label="" />}
                        title="Dropbox"
                        testId="dropbox-nesting-item"
                        isDisabled
                      >
                        <span />
                      </NestingItem>

                      <ButtonItem iconBefore={<WorkIcon label="" />}>
                        Your work
                      </ButtonItem>

                      <LinkItem href="#" iconBefore={<CustomerIcon label="" />}>
                        Your customers
                      </LinkItem>
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
                            Give feedback
                          </Button>
                          {" ∙ "}
                          <Button
                            appearance="subtle-link"
                            href="/learn"
                            spacing="none"
                          >
                            Learn more
                          </Button>
                        </Fragment>
                      }
                      iconBefore={<Icon label="mode" />}
                    >
                      You're in a next-gen project
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
