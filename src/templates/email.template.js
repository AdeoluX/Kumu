const moment = require("moment");

const signUpEmail = () => {};

const invitationEmail = ({
  firstname,
  inviter,
  inviterEmail,
  school,
  password,
}) => {
  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
    
      <head></head>
      <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Join ${school} on Kumu<div>  ‌</div>
      </div>
    
      <body style="margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;background-color:rgb(255,255,255);font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin-left:auto;margin-right:auto;margin-top:40px;margin-bottom:40px;width:465px;border-radius:0.25rem;border-width:1px;border-style:solid;border-color:rgb(234,234,234);padding:20px">
          <tr style="width:100%">
            <td>
              <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-top:32px">
                <tbody>
                  <tr>
                    <td><img alt="Vercel" src="https://res.cloudinary.com/dsavh0wlc/image/upload/v1700846074/xing_uov052.png" width="40" height="37" style="display:block;outline:none;border:none;text-decoration:none;margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px" /></td>
                  </tr>
                </tbody>
              </table>
              <h1 style="margin-left:0px;margin-right:0px;margin-top:30px;margin-bottom:30px;padding:0px;text-align:center;font-size:24px;font-weight:400;color:rgb(0,0,0)">Join <strong>${school}</strong> on <strong>Kumu</strong></h1>
              <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Hello ${firstname},</p>
              <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)"><strong>${inviter}</strong> (<a target="_blank" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none" href="mailto:${inviterEmail}">${inviterEmail}</a>) has invited you to the <strong>${school}</strong> team on <strong>Kumu</strong>.</p>
              <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-bottom:32px;margin-top:32px;text-align:center">
                <tbody>
                  <tr>
                    <td><a href="https://vercel.com/teams/invite/foo" target="_blank" style="p-x:20px;p-y:12px;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;padding:12px 20px;border-radius:0.25rem;background-color:rgb(0,0,0);text-align:center;font-size:12px;font-weight:600;color:rgb(255,255,255);text-decoration-line:none"><span></span><span style="p-x:20px;p-y:12px;max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:9px">Join the team</span><span></span></a></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Your random password is ${password} copy and paste this URL into your browser: <a target="_blank" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none" href="${process.env.VERIFICATION_LINK}/reset-password">${process.env.VERIFICATION_LINK}/reset-password</a></p>
              <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin-left:0px;margin-right:0px;margin-top:26px;margin-bottom:26px;border-width:1px;border-style:solid;border-color:rgb(234,234,234)" />
              </td>
          </tr>
        </table>
      </body>
    </html>
  `;
  return html;
};

const signInEmail = ({ firstname }) => {
  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
    
      <head></head>
      <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Kumu recent login<div>                                                                                                 </div>
      </div>
    
      <body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em">
          <tr style="width:100%">
            <td>
              <table style="padding:30px 20px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td><img src="https://res.cloudinary.com/dsavh0wlc/image/upload/v1700846074/xing_uov052.png" style="display:block;outline:none;border:none;text-decoration:none;width:50px;height:50px" /></td>
                  </tr>
                </tbody>
              </table>
              <table style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <table width="100%" style="padding:20px 40px;padding-bottom:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                        <tbody style="width:100%">
                          <tr style="width:100%">
                            <td>
                              <h1 style="font-size:32px;font-weight:bold;text-align:center">Hi ${firstname},</h1>
                              <h2 style="font-size:26px;font-weight:bold;text-align:center">We noticed a recent login to your Kumu account.</h2>
                              <p style="font-size:16px;line-height:24px;margin:16px 0"><b>Time: </b>${moment().format(
                                "MMM-DD-YYYY"
                              )}</p>
                              <p style="font-size:16px;line-height:24px;margin:16px 0">If this was you, there&#x27;s nothing else you need to do.</p>
                              <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px">If this wasn&#x27;t you or if you have additional questions, please see our support page.</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table width="100%" style="padding:20px 40px;padding-top:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                        <tbody style="width:100%">
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style="padding:45px 0 0 0" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                
              </table>
            </td>
          </tr>
        </table>
      </body>
    
    </html>
    `;
  return html;
};

const verificationEmail = ({ name, verificationCode, link }) => {
  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
      <head></head>
      <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Verification Code<div>                                                                                                                             </div>
      </div>
      <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:560px">
          <tr style="width:100%">
            <td><img alt="Linear" src="https://res.cloudinary.com/dsavh0wlc/image/upload/v1700846074/xing_uov052.png" width="42" height="42" style="display:block;outline:none;border:none;text-decoration:none;border-radius:21px;width:42px;height:42px" />
              <h1 style="font-size:24px;letter-spacing:-0.5px;line-height:1.3;font-weight:400;color:#484848;padding:17px 0 0">Verification Code</h1>
              <table style="padding:27px 0 27px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td><a href="${process.env.VERIFICATION_LINK}/${link}" target="_blank" style="background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;line-height:100%;max-width:100%;padding:11px 23px"><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%;mso-text-raise:16.5" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:8.25px">Click to verify</span><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149">${name}</p>
              <p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149">This link and code will only be valid for the next 5 minutes. If the link does not work, you can use the login verification code directly:</p><code style="font-family:monospace;font-weight:700;padding:1px 4px;background-color:#dfe1e4;letter-spacing:-0.3px;font-size:21px;border-radius:4px;color:#3c4149">${verificationCode}</code>
              <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" /><a target="_blank" style="color:#b4becc;text-decoration:none;font-size:14px" href="https://linear.app">Kumu</a>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
  return html;
};

const studentProfile = ({name, school, defaultPassword}) => {
  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
      <head></head>
      <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Verification Code<div>                                                                                                                             </div>
      </div>
      <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:560px">
          <tr style="width:100%">
            <td><img alt="Linear" src="https://res.cloudinary.com/dsavh0wlc/image/upload/v1700846074/xing_uov052.png" width="42" height="42" style="display:block;outline:none;border:none;text-decoration:none;border-radius:21px;width:42px;height:42px" />
              <h1 style="font-size:24px;letter-spacing:-0.5px;line-height:1.3;font-weight:400;color:#484848;padding:17px 0 0">Verification Code</h1>
              <table style="padding:27px 0 27px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td><a href="${process.env.VERIFICATION_LINK}/${link}" target="_blank" style="background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;line-height:100%;max-width:100%;padding:11px 23px"><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%;mso-text-raise:16.5" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:8.25px">Click to verify</span><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149">${name}</p>
              <p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149">You have been profiled as student of ${school}. Your default password is;</p><code style="font-family:monospace;font-weight:700;padding:1px 4px;background-color:#dfe1e4;letter-spacing:-0.3px;font-size:21px;border-radius:4px;color:#3c4149">${defaultPassword}</code>
              <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" /><a target="_blank" style="color:#b4becc;text-decoration:none;font-size:14px" href="https://linear.app">Kumu</a>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
  return html;
}

module.exports = {
  signUpEmail,
  signInEmail,
  verificationEmail,
  invitationEmail,
  studentProfile
};
