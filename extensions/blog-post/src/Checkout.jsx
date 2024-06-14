import {
  Banner,
  useApi,
  Text,
  reactExtension,
  Image,
  Link,
  SkeletonImage,
  View
} from '@shopify/ui-extensions-react/checkout';
import { BlockStack } from '@shopify/ui-extensions/checkout';

export default reactExtension(
  'purchase.thank-you.block.render',
  () => <Extension />,
);

function Extension() {
  const { settings } = useApi();
  console.log(settings.current.Blog);

  return (
    <BlockStack border="base" borderWidth="base" cornerRadius="base">
      {settings.current.Blog != null && (
        <BlockStack inlineAlignment="center" padding="base">
          <Text emphasis="bold" size="extraLarge">
            {settings.current.Blog}
          </Text>
        </BlockStack>
      )}
      <BlockStack>
        <Link to={settings.current.Link}>
          <Image
            fit={{ min: "small" }}
            loading="lazy"
            source={settings.current.Image}
          />
        </Link>
      </BlockStack>
      <View
        padding={['none', 'base', 'base', 'base']}
        inlineAlignment="center"
      >
        <Text size="base">{settings.current.Text}</Text>
      </View>
    </BlockStack>
  );
}
