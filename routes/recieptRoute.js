const router = require('express').Router();
const nodemailer = require('nodemailer');


const sendMail = async ({ data }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", //replace with your email provider
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });
    const getEmail = () => {
        return data['email']
    }

    let substring = '';
    data['orderItems'].map((itm) => {
        substring += `<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-10"
        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                        width="570">
                        <tbody>
                            <tr>
                                <td class="column column-1"
                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                    width="33.333333333333336%">
                                    <table border="0" cellpadding="10" cellspacing="0"
                                        class="paragraph_block block-2" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                        width="100%">
                                        <tr>
                                            <td class="pad">
                                                <div
                                                    style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:21px;">
                                                    <p style="margin: 0;">${itm['itemName']}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="column column-2"
                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                    width="33.333333333333336%">
                                    <table border="0" cellpadding="0" cellspacing="0"
                                        class="paragraph_block block-2" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                        width="100%">
                                        <tr>
                                            <td class="pad"
                                                style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;">
                                                <div
                                                    style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                                    <p style="margin: 0;">${itm['quantity']}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="column column-3"
                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                    width="33.333333333333336%">
                                    <table border="0" cellpadding="0" cellspacing="0"
                                        class="paragraph_block block-2" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                        width="100%">
                                        <tr>
                                            <td class="pad"
                                                style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;">
                                                <div
                                                    style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:700;letter-spacing:0px;line-height:150%;text-align:right;mso-line-height-alt:21px;">
                                                    <p style="margin: 0;">${itm['itemTotal']}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>`
    })


    // let createdDate = new Date(data['createdAt']);
    const shopAddress1 = '1706 University Ave, ';
    const shopAddress2 = 'Berkeley, CA 94703, USA'
    const calculateEstimatedTime = () => {
        let date = new Date(data['createdAt'])
        if (data['deliver'] === 'deliver') {
            let newDateObj1 = new Date(date.getTime() + 30 * 60000).toLocaleTimeString();
            let newDateObj2 = new Date(date.getTime() + 50 * 60000).toLocaleTimeString();
            return `${newDateObj1} - ${newDateObj2}`
        } else if (data['deliver'] === 'pickup') {
            let newDateObj1 = new Date(date.getTime() + 15 * 60000).toLocaleTimeString();
            let newDateObj2 = new Date(date.getTime() + 25 * 60000).toLocaleTimeString();
            return `${newDateObj1} - ${newDateObj2}`
        }
        // return `date`
    }
    let createdDate = new Date(data['createdAt']).toUTCString();
    createdDate = createdDate.split(' ').slice(0, 4).join(' ');

    let mail = {
        from: 'jeshuwabradley@gmail.com',
        to: getEmail(),
        subject: "Nova's  Pizza - Order Confirmation",
        html: `<!DOCTYPE html>

        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        
        <head>
            <title></title>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
            <style>
                * {
                    box-sizing: border-box;
                }
        
                body {
                    margin: 0;
                    padding: 0;
                }
        
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: inherit !important;
                }
        
                #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                }
        
                p {
                    line-height: inherit
                }
        
                .desktop_hide,
                .desktop_hide table {
                    mso-hide: all;
                    display: none;
                    max-height: 0px;
                    overflow: hidden;
                }
        
                @media (max-width:590px) {
        
                    .desktop_hide table.icons-inner,
                    .row-4 .column-1 .block-2.image_block img,
                    .row-4 .column-3 .block-2.image_block img,
                    .social_block.desktop_hide .social-table {
                        display: inline-block !important;
                    }
        
                    .icons-inner {
                        text-align: center;
                    }
        
                    .icons-inner td {
                        margin: 0 auto;
                    }
        
                    .row-content {
                        width: 100% !important;
                    }
        
                    .mobile_hide {
                        display: none;
                    }
        
                    .stack .column {
                        width: 100%;
                        display: block;
                    }
        
                    .mobile_hide {
                        min-height: 0;
                        max-height: 0;
                        max-width: 0;
                        overflow: hidden;
                        font-size: 0px;
                    }
        
                    .desktop_hide,
                    .desktop_hide table {
                        display: table !important;
                        max-height: none !important;
                    }
        
                    .row-4 .column-1 .block-2.image_block .alignment,
                    .row-4 .column-3 .block-2.image_block .alignment {
                        text-align: right !important;
                    }
        
                    .row-4 .column-2 .block-2.paragraph_block td.pad>div,
                    .row-4 .column-4 .block-2.paragraph_block td.pad>div {
                        font-size: 13px !important;
                    }
        
                    .row-3 .column-1 .block-1.paragraph_block td.pad>div {
                        font-size: 23px !important;
                    }
        
                    .row-2 .column-1 {
                        padding: 0 !important;
                    }
                }
            </style>
        </head>
        
        <body style="margin: 0; background-color: #ffffff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
            <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
                <tbody>
                    <tr>
                        <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                            <div class="spacer_block mobile_hide"
                                                                style="height:30px;line-height:30px;font-size:1px;"> </div>
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="image_block block-1" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="width:100%;padding-right:0px;padding-left:0px;">
                                                                        <div align="center" class="alignment"
                                                                            style="line-height:10px"><a
                                                                                href="https://novaspizza.com"
                                                                                style="outline:none" tabindex="-1"
                                                                                target="_blank"><img alt="Nova's Pizza"
                                                                                    src="https://ci4.googleusercontent.com/proxy/wrrtjEYYxsfHErP0QrNpJgSHdGq69NvvbZtx8VLXLk5cN2A-4o3Cb4keoLr5_fOQgmF6cqMf4nGsHQfOdB0=s0-d-e1-ft#https://i.ibb.co/SBXDLjY/NOVA-S-PIZZA-3.png"
                                                                                    style="display: block; height: auto; border: 0; width: 171px; max-width: 100%;"
                                                                                    title="Nova's Pizza" width="171" /></a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                            <div class="spacer_block mobile_hide"
                                                                style="height:30px;line-height:30px;font-size:1px;"> </div>
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <table border="0" cellpadding="20" cellspacing="0"
                                                                class="paragraph_block block-1" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div
                                                                            style="color:#706a6a;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:24px;font-weight:700;letter-spacing:1px;line-height:120%;text-align:center;mso-line-height-alt:28.799999999999997px;">
                                                                            <p style="margin: 0; margin-bottom: 3px;">Hi ${data['customer']},</p>
                                                                            <p style="margin: 0;">sit tight and wait to get your
                                                                                taste buds blown!</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <div class="spacer_block mobile_hide"
                                                                style="height:30px;line-height:30px;font-size:1px;"> </div>
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;"
                                width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                                role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; background-color: #efefef; border-radius: 6px; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="16.666666666666668%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="image_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:20px;padding-left:5px;padding-right:5px;padding-top:20px;width:100%;">
                                                                        <div align="right" class="alignment"
                                                                            style="line-height:10px"><img alt="Estimated Time"
                                                                                src="https://i.ibb.co/v43XptJ/clock.png"
                                                                                style="display: block; height: auto; border: 0; width: 24px; max-width: 100%;"
                                                                                title="Estimated Time" width="24" /></div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td class="column column-2"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="33.333333333333336%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="paragraph_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:20px;padding-top:20px;">
                                                                        <div
                                                                            style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:21px;">
                                                                            <p style="margin: 0;">Estimated ${data['deliver'] === 'deliver' ? 'Delivery' : 'Pickup'}
                                                                                Time:<br />${calculateEstimatedTime()}</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td class="column column-3"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="16.666666666666668%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="image_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:20px;padding-left:5px;padding-right:5px;padding-top:20px;width:100%;">
                                                                        <div align="right" class="alignment"
                                                                            style="line-height:10px"><img alt="Location"
                                                                                src="https://i.ibb.co/hsn49xY/location.png"
                                                                                style="display: block; height: auto; border: 0; width: 24px; max-width: 100%;"
                                                                                title="Location" width="24" /></div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td class="column column-4"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="33.333333333333336%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="paragraph_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:20px;padding-top:20px;">
                                                                        <div
                                                                            style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:21px;">
                                                                            ${data['deliver'] === 'deliver' ? `<p style="margin: 0;">${data['address']}<br />${data['city']}, ${data['state']}, ${data['zip']}<br /></p>` : `<p style="margin: 0;">${shopAddress1}<br />${shopAddress2}</p>`}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                            <div class="spacer_block mobile_hide"
                                                                style="height:30px;line-height:30px;font-size:1px;"> </div>
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                                role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="25%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="divider_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad" style="padding-top:5px;padding-bottom:5px;">
                                                                        <div align="center" class="alignment">
                                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                                role="presentation"
                                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                                width="100%">
                                                                                <tr>
                                                                                    <td class="divider_inner"
                                                                                        style="font-size: 1px; line-height: 1px; border-top: 3px solid #BBBBBB;">
                                                                                        <span> </span>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td class="column column-2"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="50%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="paragraph_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;">
                                                                        <div
                                                                            style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                                                            <p style="margin: 0;">Order Placed ${createdDate}
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td class="column column-3"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="25%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="divider_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad" style="padding-top:5px;padding-bottom:5px;">
                                                                        <div align="center" class="alignment">
                                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                                role="presentation"
                                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                                width="100%">
                                                                                <tr>
                                                                                    <td class="divider_inner"
                                                                                        style="font-size: 1px; line-height: 1px; border-top: 3px solid #BBBBBB;">
                                                                                        <span> </span>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <table border="0" cellpadding="10" cellspacing="0"
                                                                class="heading_block block-1" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <h3
                                                                            style="margin: 0; color: #555555; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                            <span class="tinyMce-placeholder">Order
                                                                                Receipt</span>
                                                                        </h3>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            ${substring}
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-11"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="divider_block block-1" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div align="center" class="alignment">
                                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                                role="presentation"
                                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                                width="100%">
                                                                                <tr>
                                                                                    <td class="divider_inner"
                                                                                        style="font-size: 1px; line-height: 1px; border-top: 3px solid #BBBBBB;">
                                                                                        <span> </span>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-12"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                                role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="41.666666666666664%">
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                            <div class="spacer_block mobile_hide"
                                                                style="height:60px;line-height:60px;font-size:1px;"> </div>
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                        </td>
                                                        <td class="column column-2"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="33.333333333333336%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="paragraph_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;">
                                                                        <div
                                                                            style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:right;mso-line-height-alt:16.8px;">
                                                                            <p style="margin: 0; margin-bottom: 16px;">Delivery
                                                                                Fee:</p>
                                                                            <p style="margin: 0; margin-bottom: 16px;">Discount:
                                                                            </p>
                                                                            <p style="margin: 0;">Tip:</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td class="column column-3"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="25%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="paragraph_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;">
                                                                        <div
                                                                            style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:right;mso-line-height-alt:16.8px;">
                                                                            <p style="margin: 0; margin-bottom: 16px;">${data['deliver'] === 'deliver' ? '$5.99' : '$0.00'}</p>
                                                                            <p style="margin: 0; margin-bottom: 16px;">${data['discount'].toFixed(2)}</p>
                                                                            <p style="margin: 0;">${data['tip'].toFixed(2)}</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-13"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="divider_block block-1" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div align="center" class="alignment">
                                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                                role="presentation"
                                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                                width="100%">
                                                                                <tr>
                                                                                    <td class="divider_inner"
                                                                                        style="font-size: 1px; line-height: 1px; border-top: 3px solid #BBBBBB;">
                                                                                        <span> </span>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-14"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                                                role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="50%">
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                            <div class="spacer_block mobile_hide"
                                                                style="height:60px;line-height:60px;font-size:1px;"> </div>
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                        </td>
                                                        <td class="column column-2"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="25%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="paragraph_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;">
                                                                        <div
                                                                            style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:right;mso-line-height-alt:16.8px;">
                                                                            <p style="margin: 0;">Total</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td class="column column-3"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="25%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="paragraph_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad"
                                                                        style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:15px;">
                                                                        <div
                                                                            style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:right;mso-line-height-alt:16.8px;">
                                                                            <p style="margin: 0;">${data['total'].toFixed(2)}</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-15"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                class="divider_block block-1" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div align="center" class="alignment">
                                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                                role="presentation"
                                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                                width="100%">
                                                                                <tr>
                                                                                    <td class="divider_inner"
                                                                                        style="font-size: 1px; line-height: 1px; border-top: 3px solid #BBBBBB;">
                                                                                        <span> </span>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-16"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <table border="0" cellpadding="10" cellspacing="0"
                                                                class="social_block block-1" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div align="center" class="alignment">
                                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                                class="social-table" role="presentation"
                                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;"
                                                                                width="92px">
                                                                                <tr>
                                                                                    <td style="padding:0 7px 0 7px;"><a
                                                                                            href="https://www.facebook.com/profile.php?id=100087345287467"
                                                                                            target="_blank"><img alt="Facebook"
                                                                                                height="32"
                                                                                                src="https://i.ibb.co/x6Yddth/facebook2x.png"
                                                                                                style="display: block; height: auto; border: 0;"
                                                                                                title="Facebook"
                                                                                                width="32" /></a></td>
                                                                                    <td style="padding:0 7px 0 7px;"><a
                                                                                            href="https://www.instagram.com/novas_pizza_llc/"
                                                                                            target="_blank"><img alt="Instagram"
                                                                                                height="32"
                                                                                                src="https://i.ibb.co/HXysr38/instagram2x.png"
                                                                                                style="display: block; height: auto; border: 0;"
                                                                                                title="Instagram"
                                                                                                width="32" /></a></td>
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table border="0" cellpadding="10" cellspacing="0"
                                                                class="paragraph_block block-2" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div
                                                                            style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
                                                                            <p style="margin: 0; margin-bottom: 5px;">*** This
                                                                                is an automatically generated email, please do
                                                                                not reply ***</p>
                                                                            <p style="margin: 0;">This email was sent to <a
                                                                                    href="mailto:${data['email']}"
                                                                                    rel="noopener"
                                                                                    style="text-decoration: underline; color: #0068a5;"
                                                                                    target="_blank">${data['email']}</a>
                                                                                by Nova's Pizza LLC.</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-17"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <table border="0" cellpadding="10" cellspacing="0"
                                                                class="paragraph_block block-1" role="presentation"
                                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                width="100%">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div
                                                                            style="color:#000000;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                                                            <p style="margin: 0; margin-bottom: 9px;"><a
                                                                                    href="http://www.novaspizza.com/"
                                                                                    rel="noopener"
                                                                                    style="text-decoration: underline; color: #0068a5;"
                                                                                    target="_blank">www.novaspizza.com</a></p>
                                                                            <p style="margin: 0; margin-bottom: 9px;">Nova's
                                                                                Pizza</p>
                                                                            <p style="margin: 0;"><a
                                                                                    href="mailto:novaspizzallc@gmail.com"
                                                                                    rel="noopener"
                                                                                    style="text-decoration: underline; color: #0068a5;"
                                                                                    target="_blank"
                                                                                    title="novaspizzallc@gmail.com">Contact
                                                                                    Us</a></p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                class="row-content stack" role="presentation"
                                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 570px;"
                                                width="570">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                            width="100%">
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                            <div class="spacer_block mobile_hide"
                                                                style="height:30px;line-height:30px;font-size:1px;"> </div>
                                                            <div class="spacer_block"
                                                                style="height:5px;line-height:5px;font-size:1px;"> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table><!-- End -->
        </body>
        
        </html>`
    }
    await transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(`sent email to ${mail['to']}`)
            res.status(200).send(`sent email to ${mail['to']}`);
        }
    });
}

router.post('/', async (req, res) => {
    const email = req.body;
    sendMail(email).then(() => {
        res.status(200).json('sent receipt email')
    }).catch((err) => {
        res.status(500).json(err)
    })
})

module.exports = router;