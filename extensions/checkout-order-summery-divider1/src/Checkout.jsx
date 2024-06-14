import {
  reactExtension,
  Divider,
  BlockSpacer,
  View,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension(
  "purchase.checkout.reductions.render-before",
  () => <Extension />,
);

function Extension() {
  return (
    <>
      <BlockSpacer spacing="extraLoose" />
      <BlockSpacer spacing="extraLoose" />
      <Divider />
      <BlockSpacer spacing="base" />
    </>
  );
}
