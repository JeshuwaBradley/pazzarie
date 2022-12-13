const Order = require('../models/Order');
const router = require("express").Router();
const nodemailer = require("nodemailer")

//create 

const sendMail = () => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      // type: "login",
      // user: process.env.EMAIL,
      // pass: process.env.PASSWORD,
      type: "OAuth2",
      user: process.env.EMAIL,
      clientId: "...",
      clientSecret: "..",
      refreshToken: "..."
    },
  })
  let mailOptions = {
    from: 'jeshuwabradley@gmail.com',
    to: "eco.products.slc@gmail.com",
    subject: `The subject goes here`,
    html: `<body class="clean-body" style="
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        background-color: #f2fafc;
        ">
       <table cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="
           table-layout: fixed;
           vertical-align: top;
           min-width: 320px;
           border-spacing: 0;
           border-collapse: collapse;
           mso-table-lspace: 0pt;
           mso-table-rspace: 0pt;
           background-color: #f2fafc;
           width: 100%;
           " valign="top" width="100%">
         <tbody>
           <tr style="vertical-align: top" valign="top">
             <td style="word-break: break-word; vertical-align: top" valign="top">
               <div style="background-color: #fb3c2d">
                 <div class="block-grid" style="
                       min-width: 320px;
                       max-width: 680px;
                       overflow-wrap: break-word;
                       word-wrap: break-word;
                       word-break: break-word;
                       margin: 0 auto;
                       background-color: transparent;
                       ">
                   <div style="
                          border-collapse: collapse;
                          display: table;
                          width: 100%;
                          background-color: transparent;
                          ">
                     <div class="col num12" style="
                             min-width: 320px;
                             max-width: 680px;
                             display: table-cell;
                             vertical-align: top;
                             width: 680px;
                             ">
                       <div class="col_cont" style="width: 100% !important">
                         <div style="
                                   border-top: 0px solid transparent;
                                   border-left: 0px solid transparent;
                                   border-bottom: 0px solid transparent;
                                   border-right: 0px solid transparent;
                                   padding-top: 5px;
                                   padding-bottom: 5px;
                                   padding-right: 0px;
                                   padding-left: 0px;
                                   ">
                           <table cellpadding="0" cellspacing="0" class="divider" role="presentation" style="
                                      table-layout: fixed;
                                      vertical-align: top;
                                      border-spacing: 0;
                                      border-collapse: collapse;
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      min-width: 100%;
                                      -ms-text-size-adjust: 100%;
                                      -webkit-text-size-adjust: 100%;
                                      " valign="top" width="100%">
                             <tbody>
                               <tr style="vertical-align: top" valign="top">
                                 <td class="divider_inner" style="
                                               word-break: break-word;
                                               vertical-align: top;
                                               min-width: 100%;
                                               -ms-text-size-adjust: 100%;
                                               -webkit-text-size-adjust: 100%;
                                               padding-top: 0px;
                                               padding-right: 0px;
                                               padding-bottom: 0px;
                                               padding-left: 0px;
                                               " valign="top">
                                   <table cellpadding="0" cellspacing="0" class="divider_content" height="01" role="presentation" style="
                                                  table-layout: fixed;
                                                  vertical-align: top;
                                                  border-spacing: 0;
                                                  border-collapse: collapse;
                                                  mso-table-lspace: 0pt;
                                                  mso-table-rspace: 0pt;
                                                  border-top: 0px solid transparent;
                                                  height: 01px;
                                                  width: 100%;
                                                  " valign="top" width="100%">
                                     <tbody>
                                       <tr style="vertical-align: top" valign="top">
                                         <td height="1" style="
                                                           word-break: break-word;
                                                           vertical-align: top;
                                                           -ms-text-size-adjust: 100%;
                                                           -webkit-text-size-adjust: 100%;
                                                           " valign="top">
                                           <span></span>
                                         </td>
                                       </tr>
                                     </tbody>
                                   </table>
                                 </td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div style="background-color: transparent">
                 <div class="block-grid" style="
                       min-width: 320px;
                       max-width: 680px;
                       overflow-wrap: break-word;
                       word-wrap: break-word;
                       word-break: break-word;
                       margin: 0 auto;
                       background-color: transparent;
                       ">
                   <div style="
                          border-collapse: collapse;
                          display: table;
                          width: 100%;
                          background-color: transparent;
                          ">
                     <div class="col num12" style="
                             min-width: 320px;
                             max-width: 680px;
                             display: table-cell;
                             vertical-align: top;
                             width: 680px;
                             ">
                       <div class="col_cont" style="width: 100% !important">
                         <div style="
                                   border-top: 0px solid transparent;
                                   border-left: 0px solid transparent;
                                   border-bottom: 0px solid transparent;
                                   border-right: 0px solid transparent;
                                   padding-top: 5px;
                                   padding-bottom: 5px;
                                   padding-right: 0px;
                                   padding-left: 0px;
                                   ">
                           <table cellpadding="0" cellspacing="0" class="divider" role="presentation" style="
                                      border: 0;
                                      table-layout: fixed;
                                      vertical-align: top;
                                      border-spacing: 0;
                                      border-collapse: collapse;
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      min-width: 100%;
                                      -ms-text-size-adjust: 100%;
                                      -webkit-text-size-adjust: 100%;
                                      " valign="top" width="100%">
                             <tbody>
                               <tr style="vertical-align: top" valign="top">
                                 <td class="divider_inner" style="
                                               word-break: break-word;
                                               vertical-align: top;
                                               min-width: 100%;
                                               -ms-text-size-adjust: 100%;
                                               -webkit-text-size-adjust: 100%;
                                               padding-top: 0px;
                                               padding-right: 0px;
                                               padding-bottom: 0px;
                                               padding-left: 0px;
                                               " valign="top">
                                   <table cellpadding="0" cellspacing="0" class="divider_content" height="5" role="presentation" style="
                                                  table-layout: fixed;
                                                  vertical-align: top;
                                                  border-spacing: 0;
                                                  border-collapse: collapse;
                                                  mso-table-lspace: 0pt;
                                                  mso-table-rspace: 0pt;
                                                  border-top: 0px solid transparent;
                                                  height: 5px;
                                                  width: 100%;
                                                  " valign="top" width="100%">
                                     <tbody>
                                       <tr style="vertical-align: top" valign="top">
                                         <td height="5" style="
                                                           word-break: break-word;
                                                           vertical-align: top;
                                                           -ms-text-size-adjust: 100%;
                                                           -webkit-text-size-adjust: 100%;
                                                           " valign="top">
                                           <span></span>
                                         </td>
                                       </tr>
                                     </tbody>
                                   </table>
                                 </td>
                               </tr>
                             </tbody>
                           </table>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div style="background-color: transparent">
                 <div class="block-grid" style="
                    min-width: 320px;
                    max-width: 680px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    margin: 0 auto;
                    background-color: transparent;
                    ">
                   <div style="
                       border-collapse: collapse;
                       display: table;
                       width: 100%;
                       background-color: transparent;
                       ">
                     <div class="col num12" style="
                          min-width: 320px;
                          max-width: 680px;
                          display: table-cell;
                          vertical-align: top;
                          width: 680px;
                          ">
                       <div class="col_cont" style="width: 100% !important">
                         <div style="
                                border-top: 0px solid transparent;
                                border-left: 0px solid transparent;
                                border-bottom: 0px solid transparent;
                                border-right: 0px solid transparent;
                                padding-top: 5px;
                                padding-bottom: 5px;
                                padding-right: 0px;
                                padding-left: 0px;
                                ">
                           <div align="center" class="img-container center fixedwidth" style="padding-right: 0px; padding-left: 0px">
                             <div style="
                                      color: #44464a;
                                      font-family: 'Playfair Display', Georgia, serif;
                                      line-height: 1.2;
                                      padding-top: 10px;
                                      padding-right: 10px;
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      ">
                               <div class="txtTinyMce-wrapper" style="
                                         line-height: 1.2;
                                         font-size: 12px;
                                         font-family: 'Playfair Display', Georgia, serif;
                                         color: #44464a;
                                         mso-line-height-alt: 14px;
                                         ">
                                 <p style="
                                            font-size: 30px;
                                            line-height: 1.2;
                                            word-break: break-word;
                                            text-align: center;
                                            font-family: 'Playfair Display', Georgia, serif;
                                            mso-line-height-alt: 36px;
                                            margin: 0;
                                            ">
                                   <span style="font-size: 30px">Nova's Pizza</span>
                                 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid mixed-two-up" style="
                       min-width: 320px;
                       max-width: 680px;
                       overflow-wrap: break-word;
                       word-wrap: break-word;
                       word-break: break-word;
                       margin: 0 auto;
                       background-color: #ffffff;
                       ">
                     <div style="
                          border-collapse: collapse;
                          display: table;
                          width: 100%;
                          background-color: #ffffff;
                          ">
                       <div class="col num8" style="
                             display: table-cell;
                             vertical-align: top;
                             max-width: 320px;
                             min-width: 448px;
                             width: 453px;
                             ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
                                   border-top: 0px solid transparent;
                                   border-left: 0px solid transparent;
                                   border-bottom: 0px solid transparent;
                                   border-right: 0px solid transparent;
                                   padding-top: 15px;
                                   padding-bottom: 5px;
                                   padding-right: 10px;
                                   padding-left: 10px;
                                   ">
                             <div style="
                                      color: #44464a;
                                      font-family: Nunito, Arial, Helvetica Neue,
                                      Helvetica, sans-serif;
                                      line-height: 1.2;
                                      padding-top: 10px;
                                      padding-right: 10px;
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      ">
                               <div class="txtTinyMce-wrapper" style="
                                         line-height: 1.2;
                                         font-size: 12px;
                                         color: #44464a;
                                         font-family: Nunito, Arial, Helvetica Neue,
                                         Helvetica, sans-serif;
                                         mso-line-height-alt: 14px;
                                         ">
                                 <p style="
                                            font-size: 14px;
                                            line-height: 1.2;
                                            word-break: break-word;
                                            mso-line-height-alt: 17px;
                                            margin: 0;
                                            "> Order number: <span style="color: #fb3c2d">
                                     <strong>00000001</strong>
                                   </span>
                                 </p>
                               </div>
                             </div>
                             <div style="
                                      color: #44464a;
                                      font-family: Nunito, Arial, Helvetica Neue,
                                      Helvetica, sans-serif;
                                      line-height: 1.2;
                                      padding-top: 10px;
                                      padding-right: 10px;
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      ">
                               <div class="txtTinyMce-wrapper" style="
                                         line-height: 1.2;
                                         font-size: 12px;
                                         color: #44464a;
                                         font-family: Nunito, Arial, Helvetica Neue,
                                         Helvetica, sans-serif;
                                         mso-line-height-alt: 14px;
                                         ">
                                 <p style="
                                            font-size: 14px;
                                            line-height: 1.2;
                                            word-break: break-word;
                                            mso-line-height-alt: 17px;
                                            margin: 0;
                                            "> Invoice Date: Jun 18, 2018 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <!--[if (mso)|(IE)]>
                     </td>
                     <td align="center" width="226" style="background-color:#ffffff;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top">
                         <table width="100%" cellpadding="0" cellspacing="0" border="0">
                             <tr>
                                 <td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:15px;">
                                     <![endif]-->
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 15px;
              padding-right: 0px;
              padding-left: 0px;
              ">
                             <div class="mobile_hide">
                               <table cellpadding="0" cellspacing="0" class="divider" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top" width="100%">
                                 <tbody>
                                   <tr style="vertical-align: top" valign="top">
                                     <td class="divider_inner" style="
              word-break: break-word;
              vertical-align: top;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              padding-top: 0px;
              padding-right: 0px;
              padding-bottom: 0px;
              padding-left: 0px;
              " valign="top">
                                       <table cellpadding="0" cellspacing="0" class="divider_content" height="15" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-top: 0px solid transparent;
              height: 15px;
              width: 100%;
              " valign="top" width="100%">
                                         <tbody>
                                           <tr style="vertical-align: top" valign="top">
                                             <td height="15" style="
              word-break: break-word;
              vertical-align: top;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top">
                                               <span></span>
                                             </td>
                                           </tr>
                                         </tbody>
                                       </table>
                                     </td>
                                   </tr>
                                 </tbody>
                               </table>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid" style="
              min-width: 320px;
              max-width: 680px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: transparent;
              ">
                     <div style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
              ">
                       <div class="col num12" style="
              min-width: 320px;
              max-width: 680px;
              display: table-cell;
              vertical-align: top;
              width: 680px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 0px;
              padding-left: 0px;
              ">
                             <table cellpadding="0" cellspacing="0" class="divider" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top" width="100%">
                               <tbody>
                                 <tr style="vertical-align: top" valign="top">
                                   <td class="divider_inner" style="
              word-break: break-word;
              vertical-align: top;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              padding-top: 0px;
              padding-right: 0px;
              padding-bottom: 0px;
              padding-left: 0px;
              " valign="top">
                                     <table cellpadding="0" cellspacing="0" class="divider_content" height="15" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-top: 0px solid transparent;
              height: 15px;
              width: 100%;
              " valign="top" width="100%">
                                       <tbody>
                                         <tr style="vertical-align: top" valign="top">
                                           <td height="15" style="
              word-break: break-word;
              vertical-align: top;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top">
                                             <span></span>
                                           </td>
                                         </tr>
                                       </tbody>
                                     </table>
                                   </td>
                                 </tr>
                               </tbody>
                             </table>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid three-up no-stack" style="
              min-width: 320px;
              max-width: 680px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: transparent;
              ">
                     <div style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
              ">
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              background-color: #f9feff;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 15px;
              padding-left: 15px;
              ">
                             <div style="
              color: #fb3c2d;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 10px;
              padding-bottom: 10px;
              padding-left: 10px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #fb3c2d;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              mso-line-height-alt: 17px;
              margin: 0;
              "> Item </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <!--[if (mso)|(IE)]>
                                 </td>
                                 <td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top">
                                     <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                         <tr>
                                             <td style="padding-right: 15px; padding-left: 15px; padding-top:5px; padding-bottom:5px;background-color:#f9feff;">
                                                 <![endif]-->
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              background-color: #f9feff;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 15px;
              padding-left: 15px;
              ">
                             <div style="
              color: #fb3c2d;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 10px;
              padding-bottom: 10px;
              padding-left: 10px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #fb3c2d;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              text-align: center;
              mso-line-height-alt: 17px;
              margin: 0;
              "> Extras </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <!--[if (mso)|(IE)]>
                                             </td>
                                             <td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top">
                                                 <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                     <tr>
                                                         <td style="padding-right: 15px; padding-left: 15px; padding-top:5px; padding-bottom:5px;background-color:#f9feff;">
                                                             <![endif]-->
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              background-color: #f9feff;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 15px;
              padding-left: 15px;
              ">
                             <div style="
              color: #fb3c2d;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 10px;
              padding-bottom: 10px;
              padding-left: 10px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #fb3c2d;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              text-align: right;
              mso-line-height-alt: 17px;
              margin: 0;
              "> Quantity </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid three-up no-stack" style="
              min-width: 320px;
              max-width: 680px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: transparent;
              ">
                     <div style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
              ">
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 5px;
              padding-left: 5px;
              ">
                             <div style="
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 0px;
              padding-bottom: 10px;
              padding-left: 10px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              mso-line-height-alt: 17px;
              margin: 0;
              "> Product Number 01 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 5px;
              padding-left: 5px;
              ">
                             <div style="
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 5px;
              padding-bottom: 10px;
              padding-left: 5px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              text-align: center;
              mso-line-height-alt: 17px;
              margin: 0;
              "> 1 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 5px;
              padding-left: 5px;
              ">
                             <div style="
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 10px;
              padding-bottom: 10px;
              padding-left: 0px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              text-align: right;
              mso-line-height-alt: 17px;
              margin: 0;
              "> $ 100,00 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid" style="
              min-width: 320px;
              max-width: 680px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: transparent;
              ">
                     <div style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
              ">
                       <div class="col num12" style="
              min-width: 320px;
              max-width: 680px;
              display: table-cell;
              vertical-align: top;
              width: 680px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 0px;
              padding-left: 0px;
              ">
                             <table cellpadding="0" cellspacing="0" class="divider" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top" width="100%">
                               <tbody>
                                 <tr style="vertical-align: top" valign="top">
                                   <td class="divider_inner" style="
              word-break: break-word;
              vertical-align: top;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              padding-top: 0px;
              padding-right: 0px;
              padding-bottom: 0px;
              padding-left: 0px;
              " valign="top">
                                     <table cellpadding="0" cellspacing="0" class="divider_content" height="1" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-top: 1px solid #e1ecef;
              height: 1px;
              width: 100%;
              " valign="top" width="100%">
                                       <tbody>
                                         <tr style="vertical-align: top" valign="top">
                                           <td height="1" style="
              word-break: break-word;
              vertical-align: top;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top">
                                             <span></span>
                                           </td>
                                         </tr>
                                       </tbody>
                                     </table>
                                   </td>
                                 </tr>
                               </tbody>
                             </table>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid three-up no-stack" style="
              min-width: 320px;
              max-width: 680px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: transparent;
              ">
                     <div style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
              ">
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 5px;
              padding-left: 5px;
              ">
                             <div style="
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 0px;
              padding-bottom: 10px;
              padding-left: 10px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              mso-line-height-alt: 17px;
              margin: 0;
              "> Product Number 02 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 5px;
              padding-left: 5px;
              ">
                             <div style="
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 5px;
              padding-bottom: 10px;
              padding-left: 5px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              text-align: center;
              mso-line-height-alt: 17px;
              margin: 0;
              "> 2 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 5px;
              padding-left: 5px;
              ">
                             <div style="
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 10px;
              padding-bottom: 10px;
              padding-left: 0px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              text-align: right;
              mso-line-height-alt: 17px;
              margin: 0;
              "> $ 200,00 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid" style="
              min-width: 320px;
              max-width: 680px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: transparent;
              ">
                     <div style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
              ">
                       <div class="col num12" style="
              min-width: 320px;
              max-width: 680px;
              display: table-cell;
              vertical-align: top;
              width: 680px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 0px;
              padding-left: 0px;
              ">
                             <table cellpadding="0" cellspacing="0" class="divider" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top" width="100%">
                               <tbody>
                                 <tr style="vertical-align: top" valign="top">
                                   <td class="divider_inner" style="
              word-break: break-word;
              vertical-align: top;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              padding-top: 0px;
              padding-right: 0px;
              padding-bottom: 0px;
              padding-left: 0px;
              " valign="top">
                                     <table cellpadding="0" cellspacing="0" class="divider_content" height="1" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-top: 1px solid #e1ecef;
              height: 1px;
              width: 100%;
              " valign="top" width="100%">
                                       <tbody>
                                         <tr style="vertical-align: top" valign="top">
                                           <td height="1" style="
              word-break: break-word;
              vertical-align: top;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top">
                                             <span></span>
                                           </td>
                                         </tr>
                                       </tbody>
                                     </table>
                                   </td>
                                 </tr>
                               </tbody>
                             </table>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid three-up no-stack" style="
              min-width: 320px;
              max-width: 680px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: transparent;
              ">
                     <div style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
              ">
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 5px;
              padding-left: 5px;
              ">
                             <div style="
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 0px;
              padding-bottom: 10px;
              padding-left: 10px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              mso-line-height-alt: 17px;
              margin: 0;
              "> Product Number 03 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 5px;
              padding-left: 5px;
              ">
                             <div style="
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 5px;
              padding-bottom: 10px;
              padding-left: 5px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              text-align: center;
              mso-line-height-alt: 17px;
              margin: 0;
              "> 1 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <div class="col num4" style="
              display: table-cell;
              vertical-align: top;
              max-width: 320px;
              min-width: 224px;
              width: 226px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 5px;
              padding-left: 5px;
              ">
                             <div style="
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.2;
              padding-top: 10px;
              padding-right: 10px;
              padding-bottom: 10px;
              padding-left: 0px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.2;
              font-size: 12px;
              color: #393d47;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 14px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.2;
              word-break: break-word;
              text-align: right;
              mso-line-height-alt: 17px;
              margin: 0;
              "> $ 100,00 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid" style="
              min-width: 320px;
              max-width: 680px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: transparent;
              ">
                     <div style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
              ">
                       <div class="col num12" style="
              min-width: 320px;
              max-width: 680px;
              display: table-cell;
              vertical-align: top;
              width: 680px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 0px;
              padding-left: 0px;
              ">
                             <table cellpadding="0" cellspacing="0" class="divider" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top" width="100%">
                               <tbody>
                                 <tr style="vertical-align: top" valign="top">
                                   <td class="divider_inner" style="
              word-break: break-word;
              vertical-align: top;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              padding-top: 0px;
              padding-right: 0px;
              padding-bottom: 0px;
              padding-left: 0px;
              " valign="top">
                                     <table cellpadding="0" cellspacing="0" class="divider_content" height="1" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-top: 1px solid #e1ecef;
              height: 1px;
              width: 100%;
              " valign="top" width="100%">
                                       <tbody>
                                         <tr style="vertical-align: top" valign="top">
                                           <td height="1" style="
              word-break: break-word;
              vertical-align: top;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top">
                                             <span></span>
                                           </td>
                                         </tr>
                                       </tbody>
                                     </table>
                                   </td>
                                 </tr>
                               </tbody>
                             </table>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid" style="
              min-width: 320px;
              max-width: 680px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: transparent;
              ">
                     <div style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
              ">
                       <div class="col num12" style="
              min-width: 320px;
              max-width: 680px;
              display: table-cell;
              vertical-align: top;
              width: 680px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 0px;
              padding-left: 0px;
              ">
                             <table cellpadding="0" cellspacing="0" class="divider" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top" width="100%">
     
     
     
     
                               <tbody>
                                 <tr style="vertical-align: top" valign="top">
                                   <td class="divider_inner" style="
              word-break: break-word;
              vertical-align: top;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              padding-top: 0px;
              padding-right: 0px;
              padding-bottom: 0px;
     
              padding-left: 0px;
              " valign="top">
     
     
     
     
                                     <table cellpadding="0" cellspacing="0" class="divider_content" height="40" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-top: 0px solid transparent;
              height: 40px;
              width: 100%;
              " valign="top" width="100%">
                                       <tbody>
                                         <tr style="vertical-align: top" valign="top">
                                           <td height="40" style="
              word-break: break-word;
              vertical-align: top;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top">
                                             <span></span>
                                           </td>
                                         </tr>
                                       </tbody>
                                     </table>
                                   </td>
                                 </tr>
                               </tbody>
                             </table>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid" style="
              min-width: 320px;
              max-width: 680px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: #ffffff;
              ">
                     <div style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: #ffffff;
              ">
                       <div class="col num12" style="
              min-width: 320px;
              max-width: 680px;
              display: table-cell;
              vertical-align: top;
              width: 680px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 15px;
              padding-bottom: 15px;
              padding-right: 0px;
              padding-left: 0px;
              ">
                             <div style="
              color: #44464a;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              line-height: 1.5;
              padding-top: 15px;
              padding-right: 35px;
              padding-bottom: 15px;
              padding-left: 35px;
              ">
                               <div class="txtTinyMce-wrapper" style="
              line-height: 1.5;
              font-size: 12px;
              color: #44464a;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              mso-line-height-alt: 18px;
              ">
                                 <p style="
              font-size: 14px;
              line-height: 1.5;
              word-break: break-word;
              text-align: center;
              mso-line-height-alt: 21px;
              margin: 0;
              "> You can find more amazing products on our website. </p>
                               </div>
                             </div>
                             <div align="center" class="button-container" style="
              padding-top: 10px;
              padding-right: 10px;
              padding-bottom: 10px;
              padding-left: 10px;
              ">
                               <a href="/shop" style="
              -webkit-text-size-adjust: none;
              text-decoration: none;
              display: inline-block;
              color: #fb3c2d;
              background-color: transparent;
              border-radius: 28px;
              -webkit-border-radius: 28px;
              -moz-border-radius: 28px;
              width: auto;
              width: auto;
              border-top: 1px solid #fb3c2d;
              border-right: 1px solid #fb3c2d;
              border-bottom: 1px solid #fb3c2d;
              border-left: 1px solid #fb3c2d;
              padding-top: 5px;
              padding-bottom: 5px;
              font-family: Nunito, Arial, Helvetica Neue,
              Helvetica, sans-serif;
              text-align: center;
              mso-border-alt: none;
              word-break: keep-all;
              " target="_blank">
                                 <span style="
              padding-left: 20px;
              padding-right: 20px;
              font-size: 16px;
              display: inline-block;
              letter-spacing: undefined;
              ">
                                   <span style="
              font-size: 16px;
              line-height: 2;
              word-break: break-word;
              mso-line-height-alt: 32px;
              ">View More</span>
                                 </span>
                               </a>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div style="background-color: transparent">
                   <div class="block-grid" style="
              min-width: 320px;
              max-width: 680px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              margin: 0 auto;
              background-color: transparent;
              ">
                     <div style="
              border-collapse: collapse;
              display: table;
              width: 100%;
              background-color: transparent;
              ">
                       <div class="col num12" style="
              min-width: 320px;
              max-width: 680px;
              display: table-cell;
              vertical-align: top;
              width: 680px;
              ">
                         <div class="col_cont" style="width: 100% !important">
                           <div style="
              border-top: 0px solid transparent;
              border-left: 0px solid transparent;
              border-bottom: 0px solid transparent;
              border-right: 0px solid transparent;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-right: 0px;
              padding-left: 0px;
              ">
                             <table cellpadding="0" cellspacing="0" class="divider" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              min-width: 100%;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top" width="100%">
                               <tbody>
                                 <tr style="vertical-align: top" valign="top">
                                   <td class="divider_inner" style="
              word-break: break-word;
      vertical-align: top;
      min-width: 100%;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      padding-top: 0px;
      padding-right: 0px;
      padding-bottom: 0px;
              padding-left: 0px;
              " valign="top">
                                     <table cellpadding="0" cellspacing="0" class="divider_content" height="25" role="presentation" style="
              table-layout: fixed;
              vertical-align: top;
              border-spacing: 0;
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-top: 0px solid transparent;
              height: 25px;
              width: 100%;
              " valign="top" width="100%">
                                       <tbody>
                                         <tr style="vertical-align: top" valign="top">
                                           <td height="25" style="
              word-break: break-word;
              vertical-align: top;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              " valign="top">
                                             <span></span>
                                           </td>
                                         </tr>
                                       </tbody>
                                     </table>
                                   </td>
                                 </tr>
                               </tbody>
                             </table>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
             </td>
           </tr>
         </tbody>
       </table>
     </body>
     `,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  });
}

router.post('/', async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saved = await newOrder.save();
    res.status(200).json(saved);
    // sendMail()
  } catch (error) {
    res.status(500).json(error);
  }
})

//get all orders

router.get('/find', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error)
  }
})

//get one order

router.get("/find/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json(error)
  }
})


//update order status

router.put("/status/:id", async (req, res) => {
  let orderId = req.params.id;
  let updates = req.body
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates)
    res.status(200).json(`Order ${req.params.id} has been updated...`)
  } catch (error) {
    res.status(500).json(error)
  }
})

//find orders according to shop

router.get("/find-shop/:id", async (req, res) => {
  let query = { shop: req.params.id }
  try {
    const orders = await Order.find(query).sort({ createdAt: -1 }).limit(20)
    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
    res.status(error.response.status).json(error)
  }
})


//delete orders

router.delete('/delete/:id', async (req, res) => {
  let id = req.params.id
  try {
    const deletedOrder = await Order.findByIdAndDelete(id)
    res.status(200).json(deletedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get emails of all the orders

router.get('/emails', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error)
  }
})


module.exports = router;