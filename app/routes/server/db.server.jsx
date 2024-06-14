export async function getCheckoutProfileId(graphql) {
    const response = await graphql(
        `
        query checkoutProfiles {
            checkoutProfiles(first: 10) {
                edges {
                    node {
                        id
                        name
                        isPublished
                    }
                }
            }
        }
        `
    );
    return response.json();
}

export async function setStyling(graphql, id) {
    const response = await graphql(
        `mutation ChangeColorScheme1($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
            checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
                checkoutBranding {
                    designSystem {
                        colors {
                            schemes {
                                scheme1 {
                                    primaryButton {
                                        background
                                        border
                                        hover {
                                            background
                                        }
                                    }
                                }
                                scheme2 {
                                    primaryButton {
                                        background
                                        hover {
                                            background
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
        `,
        {
            variables: {
                "checkoutProfileId": id,
                "checkoutBrandingInput": {
                    "designSystem": {
                        "colors": {
                            "schemes": {
                                "scheme1": {
                                    "primaryButton": {
                                        "background": "#FFFFFF",
                                        "border":"#000000",
                                        "hover": {
                                            "background": "#000000"
                                        }
                                    }
                                },
                                "scheme2": {
                                    "primaryButton": {
                                        "background": "#fd6b60",
                                        "hover": {
                                            "background": "#fc3c2e"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    );
    return response.json();
}

export async function changeOrderSummaryScheme(graphql, id) {
    const response = await graphql(
      `mutation ChangeOrderSummaryScheme($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
        checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
          checkoutBranding {
            customizations {
                main{
                    section{
                        padding
                        borderWidth
                    }  
                }
                orderSummary{
                    section{
                    padding   
                    }
                }
                primaryButton{
                    border
                    cornerRadius
                    typography{
                    size
                    }   
                }
              headingLevel1{
                typography{
                  weight
                  size 
                }
              }
              orderSummary {
                colorScheme
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
      `,{
        variables: {
          "checkoutProfileId": id,
          "checkoutBrandingInput": {
            "customizations": {
                "main":{
                 "section":{
                    "padding":"LARGE_500",
                    "borderWidth":"LARGE_200"
                 }
                },
                "orderSummary":{
                    "section":{
                       "padding":"LARGE_200"
                    }
                   },
                "primaryButton": {
                    "border":"FULL",
                    "cornerRadius":"SMALL",
                }
            }
          }
        } 
      }
    );
    return response.json();
  }


  export async function getfunctionid(graphql) {
    const response = await graphql(
      `
      query {
        shopifyFunctions(first: 50) {
          nodes {
            app {
              title
            }
            apiType
            title
            id
          }
        }
      }
      `
    );
    return response.json();
  }
  
  export async function Hidepayment(graphql) {
    const response = await graphql(
     `mutation {
    paymentCustomizationCreate(paymentCustomization: {
      title: "Hide payment method by cart total",
      enabled: false,
      functionId: "ab7b1590-e6e3-4ab1-baac-a5f14a69a7a5",
    }) {
      paymentCustomization {
        id
      }
      userErrors {
        message
      }
    }
  }`
    );
    return response.json();
  }
  
  


