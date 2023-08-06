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
      const firstItem = data?.data?.[0] ?? {};
      const {
        Status,
        StatusCode,
        ActualDeliveryDate,
        DateCreated,
        WarehouseSender,
        WarehouseRecipient,
        PaymentStatus,
        CargoDescriptionString = '',
        CityRecipient = '',
        RecipientFullName = '',
        DocumentCost = '',
        VolumeWeight = '',
        ScheduledDeliveryDate = '',
      } = firstItem;

      return {
        success: true,
        warnings,
        data: {
          Status,
          StatusCode,
          ActualDeliveryDate,
          DateCreated,
          WarehouseSender,
          WarehouseRecipient,
          PaymentStatus,
          CargoDescriptionString,
          CityRecipient,
          RecipientFullName,
          DocumentCost,
          VolumeWeight,
          ScheduledDeliveryDate,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = getPackageData;
