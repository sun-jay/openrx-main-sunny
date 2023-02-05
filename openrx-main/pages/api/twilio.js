import twilio from 'twilio';

export default async function handler(req, res) {
  const accountSid = process.env.NEXT_PUBLIC_accountSid;
  const token = process.env.NEXT_PUBLIC_twilio_token;
  const client = twilio(accountSid, token);
  // const { phone, message } = req.body
  console.log(req.body);
  client.messages
    .create({
      body: "Hello from OpenRx! Remember to take your " + "medicine" + " today!",
      from: "+18443950008",
      to: "+19255484242",
    })
    .then((message) =>
      res.json({
        success: true,
      })
    )
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
      });
    });
}
