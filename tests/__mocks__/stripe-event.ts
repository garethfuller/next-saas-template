export const stripeEventMock = {
  id: 'evt_3MvmUOBzx5rCIypK0YQKu7CX',
  object: 'event',
  api_version: '2019-09-09',
  created: 1681239864,
  data: {
    object: {
      id: 'pi_3MvmUOBzx5rCIypK0Oco9zBH',
      object: 'payment_intent',
      amount: 2000,
      amount_capturable: 0,
      amount_details: [Object],
      amount_received: 2000,
      application: null,
      application_fee_amount: null,
      automatic_payment_methods: null,
      canceled_at: null,
      cancellation_reason: null,
      capture_method: 'automatic',
      charges: [Object],
      client_secret:
        'pi_3MvmUOBzx5rCIypK0Oco9zBH_secret_UKoAMQcdFCXaWfTlfVjpu6ETZ',
      confirmation_method: 'automatic',
      created: 1681239864,
      currency: 'usd',
      customer: null,
      description: '(created by Stripe CLI)',
      invoice: null,
      last_payment_error: null,
      latest_charge: 'ch_3MvmUOBzx5rCIypK0jjCUXhd',
      livemode: false,
      metadata: {},
      next_action: null,
      on_behalf_of: null,
      payment_method: 'pm_1MvmUNBzx5rCIypKVxkjlUic',
      payment_method_options: [Object],
      payment_method_types: [Array],
      processing: null,
      receipt_email: null,
      review: null,
      setup_future_usage: null,
      shipping: [Object],
      source: null,
      statement_descriptor: null,
      statement_descriptor_suffix: null,
      status: 'succeeded',
      transfer_data: null,
      transfer_group: null,
    },
  },
  livemode: false,
  pending_webhooks: 3,
  request: {
    id: 'req_cZ6yO3cSRurDDP',
    idempotency_key: '40d5a181-eded-4ff8-a51c-2f9d171934e0',
  },
  type: 'payment_intent.succeeded',
}
