const Room = {
    number: {
      required: true,
      validator (rule, value) {
        if (!value) {
            return new Error('ກະລຸນາໃສ່ເລກຫ້ອງ')
        } else if (!/^\d*$/.test(value)) {
            return new Error('ເລກຫ້ອງຄວນເປັນຕົວເລກເທົ່ານັ້ນ')
        }
        return true
        },
      trigger: ['blur']
    },
    buildingName: {
      required: true,
      message: 'ກະລຸນາໃສ່ຊື່ອາຄານ',
      trigger: ['blur']
    },
    price: {
        required: true,
        validator (rule, value) {
          if (!value) {
              return new Error('ກະລຸນາໃສ່ລາຄາຕໍ່ເດືອນ')
          } else if (!/^\d*$/.test(value)) {
              return new Error('ລາຄາຕໍ່ເດືອນຄວນເປັນຕົວເລກເທົ່ານັ້ນ')
          }
          return true
          },
        trigger: ['blur']
      },
      quantity: {
        required: true,
        validator (rule, value) {
          if (!value) {
              return new Error('ກະລຸນາໃສ່ຈຳນວນຄົນຈຳກັດ')
          } else if (!/^\d*$/.test(value)) {
              return new Error('ຈຳນວນຄົນຄວນເປັນຕົວເລກເທົ່ານັ້ນ')
          }
          return true
          },
        trigger: ['blur']
      },
  };

export default Room;