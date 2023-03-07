const Order = require('../models/Order');
const router = require("express").Router();
const nodemailer = require("nodemailer")

//create 

const sendMail = async (data, saved) => {
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
  const getExtras = (item) => {
    let extras = '';
    item['extras'].map((extra) => {
      extras += `${extra}, `
    })
    return extras;
  }

  let substring = '';
  data['orderItems'].map((item) => {
    substring += `<table border="0" cellpadding="10" cellspacing="0"
    class="heading_block block-2" role="presentation"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
    width="100%">
    <tr>
      <td class="pad">
        <h3
          style="margin: 0; color: #555555; font-size: 16px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
          <span class="tinyMce-placeholder">${item['quantity']} ${item['itemName']}</span>
        </h3>
      </td>
    </tr>
  </table>
  <table border="0" cellpadding="10" cellspacing="0"
    class="list_block block-3" role="presentation"
    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
    width="100%">
    <tr>
      <td class="pad">
        <ul start="1"
          style="margin: 0; padding: 0; margin-left: 20px; list-style-type: revert; color: #000000; font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-weight: 400; line-height: 120%; text-align: left; direction: ltr; letter-spacing: 0px;">
          <li style="margin-bottom: 0px;">${item['size'] ? item['size'] : ''}</li>
          <li style="margin-bottom: 0px;">${item['crust'] ? item['crust'] : ''}
          </li>
          <li>${getExtras(item)}</li>
          <li>${item['specialNotes'] ? item['specialNotes'] : ''}</li>
        </ul>
      </td>
    </tr>
  </table>
  <table border="0" cellpadding="5" cellspacing="0"
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
								style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;">
								<span></span>
							</td>
						</tr>
					</table>
				</div>
			</td>
		</tr>
	</table>`
  })

  const getEmail = () => {
    const shops = ['1706university@gmail.com', 'hs211094@gmail.com']
    // const shops = ['jeshuwabradley@gmail.com']
    return shops[data['shop'] - 1]
  }

  const getTitle = () => {
    if (data['preOrderTime'] !== '' || data['preOrderDate'] !== '') {
      return "Pre-Order - Nova's Pizza"
    } else {
      return "New Order - Nova's Pizza"
    }
  }

  let createdDate = saved.createdAt.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles"
  });
  createdDate = createdDate.split(' ').slice(0, 5).join(' ');

  let mail = {
    from: '	novaspizza.promo@gmail.com',
    to: getEmail(),
    bcc: 'jeshuwabradley@gmail.com',
    subject: getTitle(),
    html: `
    <!DOCTYPE html>
    <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
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

		@media (max-width:500px) {
			.desktop_hide table.icons-inner {
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
		}
	</style></head>
      <body style="background-color: #b4afaf; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #b4afaf; background-image: none; background-position: top left; background-size: auto; background-repeat: no-repeat;"
        width="100%">
        <tbody>
          <tr>
            <td>
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                        class="row-content stack" role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width: 480px;"
                        width="480">
                        <tbody>
                          <tr>
                            <td class="column column-1"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                              width="100%">
                              <div class="spacer_block"
                                style="height:40px;line-height:40px;font-size:1px;"> </div>
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
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; background-color: #ffffff; width: 480px;"
                        width="480">
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
                                      style="line-height:10px"><img alt="Nova's Pizza"
                                        src="https://i.ibb.co/SBXDLjY/NOVA-S-PIZZA-3.png"
                                        style="display: block; height: auto; border: 0; width: 168px; max-width: 100%;"
                                        title="Nova's Pizza" width="168" /></div>
                                  </td>
                                </tr>
                              </table>
                              <table border="0" cellpadding="0" cellspacing="0"
                                class="heading_block block-2" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                width="100%">
                                <tr>
                                  <td class="pad" style="text-align:center;width:100%;">
                                    <h1
                                      style="margin: 0; color: #555555; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 35px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                      <span class="tinyMce-placeholder">New Order</span>
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                              <table border="0" cellpadding="0" cellspacing="0"
                                class="divider_block block-3" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                width="100%">
                                <tr>
                                  <td class="pad"
                                    style="padding-top:10px;padding-right:10px;padding-bottom:25px;padding-left:10px;">
                                    <div align="center" class="alignment">
                                      <table border="0" cellpadding="0" cellspacing="0"
                                        role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                        width="100%">
                                        <tr>
                                          <td class="divider_inner"
                                            style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;">
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
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
						role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
						<tbody>
							<tr>
								<td>
									<table align="center" border="0" cellpadding="0" cellspacing="0"
										class="row-content stack" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; border-radius: 0; width: 480px;"
										width="480">
										<tbody>
											<tr>
												<td class="column column-1"
													style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
													width="100%">
													<table border="0" cellpadding="0" cellspacing="0"
														class="paragraph_block block-1" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
														width="100%">
														<tr>
															<td class="pad"
																style="padding-top:10px;padding-right:10px;padding-bottom:40px;padding-left:10px;">
																<div
																	style="color:#000000;font-size:14px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:center;direction:ltr;letter-spacing:0px;mso-line-height-alt:16.8px;">
																	<p style="margin: 0; margin-bottom: 16px;"><span
																			style="font-family: inherit; background-color: transparent;">Order:
																		</span><strong
																			style="font-family: inherit; background-color: transparent;">#${saved['_id']}</strong></p>
																	<p style="margin: 0; margin-bottom: 16px;">Order
																		placed: <strong>${createdDate}</strong>
																	</p>
                                  <p style="margin: 0; margin-bottom: 16px;">Pre-Order Date
																		: <strong>${data['preOrderDate']}</strong>
																	</p>
                                  <p style="margin: 0; margin-bottom: 16px;">Pre-Order Time
																		: <strong>${data['preOrderTime']}</strong>
																	</p>
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
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                        class="row-content stack" role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; border-radius: 0; width: 480px;"
                        width="480">
                        <tbody>
                          <tr>
                            <td class="column column-1"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                              width="16.666666666666668%">
                              <table border="0" cellpadding="0" cellspacing="0"
                                class="empty_block block-2" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                width="100%">
                                <tr>
                                  <td class="pad"
                                    style="padding-right:0px;padding-bottom:5px;padding-left:0px;padding-top:5px;">
                                    <div></div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td class="column column-2"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; border-top: 1px solid #000000; vertical-align: top;"
                              width="66.66666666666667%">
                              <table border="0" cellpadding="0" cellspacing="0"
                                class="paragraph_block block-2" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                width="100%">
                                <tr>
                                  <td class="pad"
                                    style="padding-left:10px;padding-top:5px;padding-bottom:5px;">
                                    <div
                                      style="color:#000000;font-size:16px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:1px;mso-line-height-alt:19.2px;">
                                      <p style="margin: 0; margin-bottom: 10px;">${data['deliver']}
                                        to :</p>
                                      <p style="margin: 0; margin-bottom: 10px;">${data['customer']},</p>
                                      ${data['deliver'] === 'deliver' ? `<p style="margin: 0; margin-bottom: 10px;">${data['address']}</p>
                                      <p style="margin: 0; margin-bottom: 10px;">${data['city']},
                                        ${data['state']} ${data['zip']}</p>` : ''}
                                      <p style="margin: 0;"><a href="tel:${data['mobile']}"
                                          rel="noopener noreferrer"
                                          style="text-decoration: underline; color: #0068a5;"
                                          target="_blank">${data['mobile'] ? data['mobile'] : ''}</a></p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td class="column column-3"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                              width="16.666666666666668%">
                              <table border="0" cellpadding="0" cellspacing="0"
                                class="empty_block block-2" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                width="100%">
                                <tr>
                                  <td class="pad"
                                    style="padding-right:0px;padding-bottom:5px;padding-left:0px;padding-top:5px;">
                                    <div></div>
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
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; background-color: #ffffff; border-top: 0 solid #000000; border-right: 0px solid #000000; border-bottom: 0 solid #000000; border-left: 0 solid #000000; width: 480px;"
                      width="480">
                      <tbody>
                        <tr>
                          <td class="column column-1"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                            width="100%">
                            <table border="0" cellpadding="0" cellspacing="0"
                              class="heading_block block-2" role="presentation"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                              width="100%">
                              <tr>
                                <td class="pad"
                                  style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:35px;text-align:center;width:100%;">
                                  <h2
                                    style="margin: 0; color: #555555; font-size: 25px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
                                    <span class="tinyMce-placeholder">${data['orderItems'].length > 1 ? `${data['orderItems'].length} Items` : `${data['orderItems'].length} Item`}</span>
                                  </h2>
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
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6"
						role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
						<tbody>
							<tr>
								<td>
									<table align="center" border="0" cellpadding="0" cellspacing="0"
										class="row-content stack" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 480px;"
										width="480">
										<tbody>
											<tr>
												<td class="column column-1"
													style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
													width="100%">
													<table border="0" cellpadding="5" cellspacing="0"
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
																				style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;">
																				<span> </span>
																			</td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
                          ${substring}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              </tbody>
              </table>
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9"
                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; border-radius: 0; width: 480px;"
                        width="480">
                        <tbody>
                          <tr>
                            <td class="column column-1"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                              width="33.333333333333336%">
                              <div class="spacer_block"
                                style="height:70px;line-height:5px;font-size:1px;"> </div>
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
                                    style="padding-top:15px;padding-right:10px;padding-bottom:15px;padding-left:10px;">
                                    <div
                                      style="color:#000000;font-size:12px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:right;direction:ltr;letter-spacing:0px;mso-line-height-alt:14.399999999999999px;">
                                      
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
                              width="33.333333333333336%">
                              <table border="0" cellpadding="0" cellspacing="0"
                                class="paragraph_block block-2" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                width="100%">
                                <tr>
                                  <td class="pad"
                                    style="padding-top:15px;padding-right:25px;padding-bottom:15px;padding-left:10px;">
                                    <div
                                      style="color:#000000;font-size:12px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:right;direction:ltr;letter-spacing:0px;mso-line-height-alt:14.399999999999999px;">
                                      
                                      <p style="margin: 0; margin-bottom: 16px;">${data['deliver'] === 'deliver' ? '$5.99' : '$0.00'}</p>
                                      <p style="margin: 0; margin-bottom: 16px;">$${Math.round(data['discount'] * 100) / 100}</p>
                                      <p style="margin: 0;">$${Math.round(data['tip'] * 100) / 100}</p>
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
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-10"
						role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
						<tbody>
							<tr>
								<td>
									<table align="center" border="0" cellpadding="0" cellspacing="0"
										class="row-content stack" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; border-radius: 0; width: 480px;"
										width="480">
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
																				style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;">
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
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-11"
						role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
						<tbody>
							<tr>
								<td>
									<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content"
										role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; border-radius: 0; width: 480px;"
										width="480">
										<tbody>
											<tr>
												<td class="column column-1"
													style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
													width="33.333333333333336%">
													<div class="spacer_block"
														style="height:70px;line-height:5px;font-size:1px;"> </div>
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
																style="padding-top:15px;padding-right:10px;padding-bottom:15px;padding-left:10px;">
																<div
																	style="color:#000000;font-size:17px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:right;direction:ltr;letter-spacing:0px;mso-line-height-alt:20.4px;">
																	<p style="margin: 0;">Total</p>
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
																style="padding-top:15px;padding-right:25px;padding-bottom:15px;padding-left:10px;">
																<div
																	style="color:#000000;font-size:14px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:right;direction:ltr;letter-spacing:0px;mso-line-height-alt:16.8px;">
																	<p style="margin: 0;">$${Math.round(data['total'] * 100) / 100}</p>
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
									<table align="center" border="0" cellpadding="0" cellspacing="0"
										class="row-content stack" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; border-radius: 0; width: 480px;"
										width="480">
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
																				style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;">
																				<span> </span>
																			</td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table border="0" cellpadding="10" cellspacing="0"
														class="heading_block block-2" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
														width="100%">
														<tr>
															<td class="pad">
																<h2
																	style="margin: 0; color: #555555; font-size: 18px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; line-height: 120%; text-align: left; direction: ltr; font-weight: 700; letter-spacing: normal; margin-top: 0; margin-bottom: 0;">
																	<span class="tinyMce-placeholder">Notes for the
																		kitchen</span>
																</h2>
															</td>
														</tr>
													</table>
													<table border="0" cellpadding="10" cellspacing="0"
														class="paragraph_block block-3" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
														width="100%">
														<tr>
															<td class="pad">
																<div
																	style="color:#000000;font-size:14px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0px;mso-line-height-alt:16.8px;">
																	<p style="margin: 0; margin-bottom: 16px;">${data['notes']}</p>
																</div>
															</td>
														</tr>
													</table>
													<table border="0" cellpadding="10" cellspacing="0"
														class="divider_block block-4" role="presentation"
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
																				style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;">
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
					<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-13"
						role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
						<tbody>
							<tr>
								<td>
									<table align="center" border="0" cellpadding="0" cellspacing="0"
										class="row-content stack" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; border-radius: 0; width: 480px;"
										width="480">
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
																	style="color:#000000;font-size:14px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:center;direction:ltr;letter-spacing:0px;mso-line-height-alt:16.8px;">
																	<p style="margin: 0; margin-bottom: 16px;">
																		www.novaspizza.com</p>
																	<p style="margin: 0; margin-bottom: 16px;">Nova's
																		Pizza LLC</p>
																	<p style="margin: 0;">Thank you!</p>
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
									<table align="center" border="0" cellpadding="0" cellspacing="0"
										class="row-content stack" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width: 480px;"
										width="480">
										<tbody>
											<tr>
												<td class="column column-1"
													style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
													width="100%">
													<div class="spacer_block"
														style="height:60px;line-height:60px;font-size:1px;"></div>
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
	    </table>
      </body>
    </html>
    `
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
  const newOrder = new Order(req.body);
  try {
    const saved = await newOrder.save();
    res.status(200).json(saved);
    sendMail(req.body, saved)
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