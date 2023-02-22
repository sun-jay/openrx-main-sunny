import twilio from "twilio";

export default async function handler(req, res) {
  const accountSid = process.env.NEXT_PUBLIC_accountSid;
  const token = process.env.NEXT_PUBLIC_twilio_token;
  const client = twilio(accountSid, token);
  // const { phone, message } = req.body
  // console.log(req.body);

  console.log("inside api", req.body);

  client.messages
    .create({
      body:
        "Hello from OpenRx! Remember to take your " + req.body.drug + " today!",
      from: "+18554910099",
      to: req.body.phone,
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

  // return a respose that confirms the message was sent
  res.json({
    success: true,
  });
}
