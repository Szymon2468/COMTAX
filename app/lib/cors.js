import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD']
});

export const handleCors = async (req, res) => {
  return await cors(req, res);
};
