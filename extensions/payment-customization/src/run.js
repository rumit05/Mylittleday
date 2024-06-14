// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
*/

/**
* @type {FunctionRunResult}
*/
const NO_CHANGES = {
  operations: [],
};

// The configured entrypoint for the 'purchase.payment-customization.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  console.log("dadad")
  // Get the cart total from the function input, and return early if it's below 100
  const cartTotal = parseFloat(input.cart.cost.subtotalAmount.amount ?? "0.0");
  
  if (cartTotal >= 80) {
    return NO_CHANGES;
  }

  // Find the payment method to hide
  const hidePaymentMethod = input.paymentMethods
    .find(method => method.name.includes("Alma - Payez en 3 fois"));

  if (!hidePaymentMethod) {
    return NO_CHANGES;
  }

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    operations: [{
      hide: {
        paymentMethodId: hidePaymentMethod.id
      }
    }]

  };
};
