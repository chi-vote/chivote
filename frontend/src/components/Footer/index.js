import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import './style.scss';

import LogoCollective from 'Assets/images/chivote-collective-logo-white.png';
import LogoBGA from 'Assets/images/BGA-logo-white.png';
import LogoBCC from 'Assets/images/BCC-logo-white.png';
import LogoTCR from 'Assets/images/chicago_reporter.png';
import LogoTDL from 'Assets/images/TDL-logo-white.png';
import LogoTriibe from 'Assets/images/Triibe - transparent white logo.png';

const mailchimpEmbed = `
<!-- Begin Mailchimp Signup Form -->
<link href="https://cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
   #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;}
   /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
      We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="https://bettergov.us7.list-manage.com/subscribe/post?u=41b3f3673000e91eee2aa89e7&amp;id=c88b648bc5" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
  <div id="mc_embed_signup_scroll">
   <label for="mce-EMAIL">Get updates when we post new features to Chi.vote.</label>
   <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="Enter your email address..." required>
  <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
  <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_41b3f3673000e91eee2aa89e7_c88b648bc5" tabindex="-1" value=""></div>
  <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
  </div>
</form>
</div>

<!--End mc_embed_signup-->
`;

class Footer extends Component {
  render() {
    return (
      <>
        <section
          className="mc-embed"
          dangerouslySetInnerHTML={{ __html: mailchimpEmbed }}
        />
        <footer className="footer">
          <div className="container">
            <div className="row text-center mb-5">
              <img
                className="logo logo--chivote-coll"
                src={LogoCollective}
                alt="Chi.Vote Collective"
              />
              <p className="has-text-white">
                The Chi.vote website is the core product of the Chi.vote
                Collective, a new group of nonpartisan media and civic
                organizations that believe in fostering a safer, more prosperous
                and more equitable and connected Chicago by creating content and
                tools of the highest quality and accessibility around city
                elections. The founding partners of the Collective are the
                Better Government Association, Block Club Chicago, The Chicago
                Reporter, The Daily Line and The Triibe.
              </p>
            </div>
            <div className="row collective-logos">
              <a href="https://bettergov.org">
                <img
                  src={LogoBGA}
                  alt="Better Government Association"
                  className="collective-logo"
                />
              </a>
              <a href="https://blockclubchicago.org/">
                <img
                  src={LogoBCC}
                  alt="Block Club Chicago"
                  className="collective-logo"
                />
              </a>
              <a href="https://www.chicagoreporter.com/">
                <img
                  src={LogoTCR}
                  alt="The Chicago Reporter"
                  className="collective-logo"
                />
              </a>
              <a href="http://thedailyline.net/">
                <img
                  src={LogoTDL}
                  alt="The Daily Line"
                  className="collective-logo"
                />
              </a>
              <a href="https://thetriibe.com/">
                <img
                  src={LogoTriibe}
                  alt="The TRiiBE"
                  className="collective-logo"
                />
              </a>
            </div>
            <p className="has-text-white">
            The Collective is to proud to welcome and acknowledge a new group of contributors to our effort, Outreach & Information Partners: Chalkbeat Chicago, City Bureau, Reform Illinois, South Side Weekly, and Univision.
            </p>
          </div>
        </footer>
      </>
    );
  }
}

export default hot(Footer);
