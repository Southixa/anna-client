const Renting = {
    customerId: {
      required: true,
      message: 'ກະລຸນາເລືອກຜູ້ເຊົ່າ',
      trigger: ['blur']
    },
    roomId: {
      required: true,
      message: 'ກະລຸນາເລືອກຫ້ອງເຊົ່າ',
      trigger: ['blur']
    },
    startDate: {
        required: true,
        message: 'ກະລຸນາເລືອກວັນເລີ່ມເຊົ່າ',
        trigger: ['blur']
    },
    deposit: {
      required: true,
      validator (rule, value) {
          if (!value) {
              return new Error('ກະລຸນາປ້ອນຄ່າມັດຈຳ')
          } else if (!/^\d*$/.test(value)) {
              return new Error('ຄ່າມັດຈຳຄວນເປັນຕົວເລກເທົ່ານັ້ນ')
          }
          return true
          },
          trigger: ['blur']
    },
  };

export default Renting;