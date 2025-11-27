import api from './api';

const contactService = {
  // 提交联系表单
  sendMessage: async (messageData) => {
    return await api.post('/contact', messageData);
  },
};

export default contactService;