const aws = require('aws-sdk')


let funk = async () => {

  aws.config.update({
    accessKeyId: "AKIAJNSIJIJWIO64AFXA",
    secretAccessKey: "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",
    region: "us-east-1"
  });
  const ses = new aws.SES()

  var params = {
    Destination: {
      ToAddresses: [
        'sjljarvis@gmail.com',
      ]
    },
    Source: 'no-reply@techforce.ai',
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data:
            '<h3>Hello Folks, We are very glad to have you in Techforce team. Everyone who is copied in this mail are requested to gather at cafeteria at sharp 6:30 PM, a surprise is waiting for you.</h3>.'
        }
      },
      Subject: {
        Data: 'Quick demo -Techforce.AI'
      }
    }
  }
  ses.sendEmail(params, (err, data) => {
    if (err) {
      throw err
    }
  })
}
funk()



