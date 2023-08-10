const axios = require('axios');
const { NP_API_KEY } = process.env;

const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/';

const getPackageData = async (trackingNumber, phoneNumber) => {
  const options = {
    apiKey: NP_API_KEY,
    modelName: 'TrackingDocument',
    calledMethod: 'getStatusDocuments',
    methodProperties: {
      Documents: [
        {
          DocumentNumber: trackingNumber,
          Phone: phoneNumber,
        },
      ],
    },
  };

  try {
    const { data } = await axios.post(BASE_URL, options);
    const { success, warnings, errors } = data;

    if (
      !success ||
      data.data[0].StatusCode == 3 ||
      data.data[0].Status === 'Номер не найден'
    ) {
      return { success: false, warnings, errors };
    } else {
      return {
        success: true,
        warnings,
        data: {
          status: data.data[0].Status,
          status_code: data.data[0].StatusCode,
          actual_delivery_date: data.data[0].ActualDeliveryDate,
          date_created: data.data[0].DateCreated,
          warehouse_sender: data.data[0].WarehouseSender,
          warehouse_recipient: data.data[0].WarehouseRecipient,
          payment_status: data.data[0].PaymentStatus,
          cargo_description_string: data.data[0]?.CargoDescriptionString
            ? data.data[0]?.CargoDescriptionString
            : '',
          city_recipient: data.data[0].CityRecipient,
          city_sender: data.data[0].CitySender,
          recipient_full_name: data.data[0]?.RecipientFullName
            ? data.data[0]?.RecipientFullName
            : '',
          sender_full_name: data.data[0]?.SenderFullNameEW
            ? data.data[0]?.SenderFullNameEW
            : '',
          document_cost: data.data[0].DocumentCost,
          volume_weight: data.data[0].VolumeWeight,
          scheduled_delivery_date: data.data[0].ScheduledDeliveryDate,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = getPackageData;
