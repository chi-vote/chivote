import React from 'react';
import { injectIntl } from 'react-intl';
// import './MailchimpEmbed.scss';

const mailchimpHtml = locale => {
  if (locale === 'es') {
    return `
    <!-- Begin Mailchimp Signup Form -->
    <div id="mc_embed_signup">
    <form action="https://bettergov.us7.list-manage.com/subscribe/post?u=41b3f3673000e91eee2aa89e7&amp;id=c88b648bc5" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
      <div id="mc_embed_signup_scroll">
      <label for="mce-EMAIL" class="is-size-5 mb-1">Reciba actualizaciones cuando pongamos nuevas actualizaciones en Chi.vote</label>
      <input type="email" value="" name="EMAIL" class="email input is-large" id="mce-EMAIL" placeholder="Ingrese su correo electrónico..." required>
      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_41b3f3673000e91eee2aa89e7_c88b648bc5" tabindex="-1" value=""></div>
      <div class="clear"><input type="submit" value="Inscríbase" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
      </div>
    </form>
    </div>
    <!--End mc_embed_signup-->
    `;
  } else {
    return `
    <!-- Begin Mailchimp Signup Form -->
    <div id="mc_embed_signup">
    <form action="https://bettergov.us7.list-manage.com/subscribe/post?u=41b3f3673000e91eee2aa89e7&amp;id=c88b648bc5" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
      <div id="mc_embed_signup_scroll">
       <label for="mce-EMAIL" class="is-size-5 mb-1">Get updates when we post new features to Chi.vote.</label>
       <input type="email" value="" name="EMAIL" class="email input is-large" id="mce-EMAIL" placeholder="Enter your email address..." required>
      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_41b3f3673000e91eee2aa89e7_c88b648bc5" tabindex="-1" value=""></div>
      <div class="clear"><input type="submit" value="Sign up" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
      </div>
    </form>
    </div>
    <!--End mc_embed_signup-->
    `;
  }
};

const MailchimpEmbed = props => (
  <div dangerouslySetInnerHTML={{ __html: mailchimpHtml(props.intl.locale) }} />
);

export default injectIntl(MailchimpEmbed);
