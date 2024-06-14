import React, { useEffect, useState } from "react";
import {
  useApi,
  reactExtension,
  Image,
  Link,
  BlockStack,
  InlineLayout,
  Text
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.thank-you.block.render", () => (
  <Extension />
));

function Extension() {
  const { query } = useApi();
  const [metaobject, setMetaobject] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchMetaobject();
  }, []);

  async function fetchMetaobject() {
    try {
      const { data } = await query(`
        query {
          metaobject(id: "gid://shopify/Metaobject/64720961717") {
            id
            handle
            fields {
              value
              type
              reference {
                ... on MediaImage {
                  image { url }
                }
              }
              references(first: 10) {
                edges {
                  node {
                    __typename
                    ... on Metaobject {
                      fields { key type value reference { ... on MediaImage { image { url } } } }
                    }
                  }
                }
              }
            }
          }
        }
      `);

      console.log(data);
      if (data && data.metaobject) {
        setMetaobject(data.metaobject);
        extractAndSetItems(data.metaobject.fields);
      } else {
        console.error("No data received or incorrect data structure");
      }
    } catch (error) {
      console.error("Error fetching metaobject:", error);
    }
  }

  function extractAndSetItems(fields) {
    const items = [];

    fields.forEach((field) => {
      field.references?.edges.forEach((edge) => {
        const item = {};
        edge.node.fields.forEach((fieldItem) => {
          if (fieldItem.type === "url") {
            item.url = fieldItem.value;
          } 
          if (fieldItem.type === "single_line_text_field") {
            item.text = fieldItem.value;
          } 
          if (fieldItem.type === "file_reference" && fieldItem.reference?.image?.url) {
            item.image = fieldItem.reference.image.url;
          }
        });
        if (item.url || item.text || item.image) {
          items.push(item);
        }
      });
    });

    setItems(items);
  }

  return (
    <BlockStack >
      {metaobject && (
        <>
          <InlineLayout
            padding={['base', 'none', 'none', 'none']}
            spacing="extraTight"
            columns={['0%', '10%']}
          >
            {metaobject.fields.map((field, index) => (
              <Text size="extraLarge" emphasis="bold" appearance="critical" key={index}>
                {field.type !== "list.metaobject_reference" &&
                  field.type !== "file_reference" && 
                  field.type !== "rich_text_field" &&
                  <>{field.value}</>
                }
                
                {field.reference?.image?.url && (
                  <Image source={field.reference.image.url} />
                )}
              </Text>
            ))}
          </InlineLayout>
          
          <BlockStack>
      {metaobject && (
        <>
         {items.length > 0 && (
            <BlockStack >
              {items.map((item, index) => (
                <Link key={index} appearance ="monochrome"to={item.url || "#"}>
                 <InlineLayout key={index} columns={[20, "fill", "auto"]} spacing="base" blockAlignment="center" borderRadius={"loose"} background={"base"}  padding={['none', 'none', 'none', 'extraLoose']}>
                    {item.image && <Image aspectRatio={1}  source={item.image} />}
                    {item.text && <Text>{item.text}</Text>}
                  </InlineLayout>
                </Link>
              ))}
            </BlockStack>
          )}
        </>
      )}
    </BlockStack>
        </>
      )}
    </BlockStack>
  );
}
