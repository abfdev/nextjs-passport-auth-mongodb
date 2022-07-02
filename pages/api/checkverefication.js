import { generateSecret, verify } from "2fa-util";

const handler = async (req, res) => {
  const { code } = req.body;
  const authQRCode = verify(code, "HM6BCMLWGVWQGVRE");
  res.json({
    authQRCode,
  });
};
export default handler;
