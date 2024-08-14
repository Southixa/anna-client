const Customer = {
    firstname: {
      required: true,
      message: 'ກະລຸນາໃສ່ຊື່',
      trigger: ['blur']
    },
    lastname: {
      required: true,
      message: 'ກະລຸນາໃສ່ນາມສະກຸນ',
      trigger: ['blur']
    },
    phone: {
      required: true,
      validator (rule, value) {
          if (!value) {
              return new Error('ກະລຸນາໃສ່ເບີໂທ')
          } else if (!/^\d*$/.test(value)) {
              return new Error('ເບີໂທຄວນເປັນຕົວເລກເທົ່ານັ້ນ')
          }
          return true
          },
          trigger: ['blur']
    },
    gender: {
        required: true,
        message: 'ກະລຸນາໃສ່ເລືອກເພດ',
        trigger: ['blur']
    },
    identificationId: {
        required: true,
        validator(rule, value) {
            if(!value) {
                return new Error("ກະລຸນາໃສ່ເລກບັນປະຊາຊົນ")
            } else if (!/^\d*$/.test(value)) {
                return new Error('ເບີໂທຄວນເປັນຕົວເລກເທົ່ານັ້ນ')
            } else if (value.length <= 10){
                return new Error("ເລກຕ້ອງຫຼາຍກວ່າ 10 ຕົວເລກ")
            }
            return true
        },
        trigger: ['blur']
      },
      province: {
        required: true,
        message: 'ກະລຸນາໃສ່ແຂວງ',
        trigger: ['blur']
      },
      district: {
        required: true,
        message: 'ກະລຸນາໃສ່ເມືອງ',
        trigger: ['blur']
      },
      village: {
        required: true,
        message: 'ກະລຸນາໃສ່ບ້ານ',
        trigger: ['blur']
      },
    email: {
      required: true,
      validator(rule, value) {
          if(!value) {
              return new Error("ກະລຸນາໃສ່ອີເມລ")
          } else if (!(/@gmail.com/i.test(value))){
              return new Error("ກະລຸນາໃສ່ @gmail.com")
          }
          return true
      },
      trigger: ['blur']
    },
    password: {
        required: true,
        validator(rule, value) {
            if(!value) {
                return new Error("ກະລຸນາໃສ່ລະຫັດຜ່ານ")
            } else if (value.length <= 4){
                return new Error("ລະຫັດຜ່ານຕ້ອງຫຼາຍກວ່າ 4 ຕົວອັກສອນ")
            }
            return true
        },
        trigger: ['blur']
      },
  };

export default Customer;