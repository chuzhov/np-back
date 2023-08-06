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
    if (!success) {
      return { success: false, warnings, errors };
    } else {
      const response = {
        Status: data.data[0].Status,
        StatusCode: data.data[0].StatusCode,
        ActualDeliveryDate: data.data[0].ActualDeliveryDate,
        DateCreated: data.data[0].DateCreated,
        WarehouseSender: data.data[0].WarehouseSender,
        WarehouseRecipient: data.data[0].WarehouseRecipient,
        PaymentStatus: data.data[0].PaymentStatus,
        //if phonenumber is correct
        CargoDescriptionString: data?.data[0]?.CargoDescriptionString ?? '',
        CityRecepient: data?.data[0]?.CityRecipient ?? '',
        RecipientFullName: data?.data[0]?.RecipientFullName ?? '',
        DocumentCost: data?.data[0]?.DocumentCost ?? '',
        VolumeWeight: data?.data[0]?.VolumeWeight ?? '',
        ScheduledDeliveryDate: data?.data[0]?.ScheduledDeliveryDate ?? '',
      };
      return { success: true, warnings, data: response };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = getPackageData;
