import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import { changeOrderSummaryScheme, cleardta, getCheckoutProfileId, getfunctionid, Hidepayment, setStyling } from "./server/db.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {

  await authenticate.admin(request);
  const {admin} = await authenticate.admin(request);
  const id = await getCheckoutProfileId(admin.graphql)
  let profileId = id.data.checkoutProfiles.edges
  .map((item) => (item.node.isPublished === false ? item.node.id : null))
  .filter((id) => id !== null)
 const setStylin = await setStyling(admin.graphql, profileId[1])
 await changeOrderSummaryScheme(admin.graphql,profileId[1])

 await getfunctionid(admin.graphql)
 await Hidepayment(admin.graphql)
 
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "", setStylin });
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/additional">Additional page</Link>
      </ui-nav-menu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
