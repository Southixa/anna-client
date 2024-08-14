const Staff = {
  username: {
    required: true,
    message: 'ກະລຸນາໃສ່ຊື່',
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
  role: {
      required: true,
      message: 'ກະລຸນາໃສ່ເລືອກສິດ',
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

export default Staff;