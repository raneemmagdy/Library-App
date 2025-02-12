export const emailTemplate = (emailSubject, name, body) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f0f2f5;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      padding: 20px;
    }
    .header {
      background: #0073e6;
      color: #ffffff;
      padding: 30px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 25px;
      font-size: 16px;
      line-height: 1.6;
      color: #444;
    }
    .highlight {
      color: #0073e6;
      font-weight: bold;
    }
    .otp-box {
      margin: 20px 0;
      padding: 15px;
      background-color: #eaf4ff;
      border-radius: 6px;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      color: #333;
      letter-spacing: 3px;
    }
    .footer {
      background-color: #f7f7f7;
      text-align: center;
      padding: 15px;
      font-size: 14px;
      color: #666;
      border-top: 1px solid #ddd;
    }
    .footer a {
      color: #0073e6;
      text-decoration: none;
      font-weight: 500;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      ${emailSubject}
    </div>
    <div class="content">
      <p>Hi <span class="highlight">${name}</span>,</p>
      ${body}
    </div>
    <div class="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <p><a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>
`;
