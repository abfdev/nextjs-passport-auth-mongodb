import {generateSecret, verify} from "2fa-util";


const handler = async (req, res) => {
  const authQRCode = await generateSecret('John Doe', 'Company');
  res.json({
    authQRCode,
  });
};
export default handler;
