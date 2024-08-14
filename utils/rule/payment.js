const Payment = {
    month: {
      required: true,
      message: 'ກະລຸນາເລືອກເດືອນ',
      trigger: ['blur']
    },
    year: {
      required: true,
      message: 'ກະລຸນາເລືອກປີ',
      trigger: ['blur']
    },
    accountBankName: {
        required: true,
        message: 'ກະລຸນາໃສ່ຊື່ທະນາຄານ',
        trigger: ['blur']
    },
    accountNumber: {
      required: true,
      validator (rule, value) {
          if (!value) {
              return new Error('ກະລຸນາໃສ່ເລກບັນຊີທະນາຄານ')
          } else if (!/^\d*$/.test(value)) {
              return new Error('ເລກຄວນເປັນຕົວເລກເທົ່ານັ້ນ')
          }
          return true
          },
          trigger: ['blur']
    },
    accountName: {
        required: true,
        message: 'ກະລຸນາໃສ່ຊື່ເຈົ້າທີ່ຢູ່ໃນເລກບັນຊີ',
        trigger: ['blur']
    },
  };

export default Payment;