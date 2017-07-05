import React from 'react';
import {
  TouchableHighlight,
  View,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';
import { Colors, Metrics } from '../Themes';
import Button from '../Components/Button';

export default props => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.textWrapper}>
        <Text style={styles.title}>
          Chain React Photobomb App End User License Agreement
        </Text>

        <Text style={styles.text}>
          This End User License Agreement (“Agreement”) is between you and Chain
          React Photobomb and governs use of this app made available through the
          App Store. By installing the Chain React Photobomb App, you agree
          to be bound by this Agreement and understand that there is no
          tolerance for objectionable content. If you do not agree with the
          terms and
          conditions of this Agreement, you are not entitled to use the Chain
          React Photobomb App.

          {'\n\n'}

          In order to ensure Chain React Photobomb provides the best experience
          possible for everyone, we strongly enforce a no tolerance policy for
          objectionable content. If you see inappropriate content, please use
          the
          “Flag this photo” feature found when viewing an image.

          {'\n\n'}
          1. Parties

          {'\n'}
          This Agreement is between you and Chain React Photobomb only. Chain
          React Photobomb is solely responsible for the Chain React Photobomb
          App
          and its content.

          {'\n\n'}
          2. Privacy

          {'\n'}
          Chain React Photobomb may collect and use information about your usage
          of the Chain React Photobomb App, including certain types of
          information
          from and about your device. Chain React Photobomb may use this
          information, as long as it is in a form that does not personally
          identify you, to measure the use and performance of the Chain React
          Photobomb App.

          {'\n\n'}
          See the full privacy policy at:
          https://www.chainreactphotobomb.com/privacy.
          {'\n\n'}

          3. Limited License
          {'\n'}

          Chain React Photobomb grants you a limited, non-exclusive,
          non-transferable, revocable license to use the Chain React Photobomb
          App
          for your personal, non-commercial purposes. You may only use the Chain
          React Photobomb App on devices that you own or control and as
          permitted by the App Store Terms of Service.
          {'\n\n'}

          4. Age Restrictions
          {'\n'}

          By using the Chain React Photobomb App, you represent and warrant that
          (a) you are 17 years of age or older and you agree to be bound by this
          Agreement; (b) if you are under 17 years of age, you have obtained
          verifiable consent from a parent or legal guardian; and (c) your use
          of
          the Chain React Photobomb App does not violate any applicable law or
          regulation. Your access to the Chain React Photobomb App may be
          terminated without warning if Chain React Photobomb believes, in its
          sole discretion, that you are under the age of 17 years and have not
          obtained verifiable consent from a parent or legal guardian. If you
          are
          a parent or legal guardian and you provide your consent to your
          child’s
          use of the Chain React Photobomb App, you agree to be bound by this
          Agreement in respect to your child’s use of the Chain React Photobomb
          App.
          {'\n\n'}

          5. Objectionable Content Policy
          {'\n'}

          Content may not be submitted to Chain React Photobomb, who will
          moderate
          all content and ultimately decide to remove a submission to
          the extent such content includes, is in conjunction with, or alongside
          any, Objectionable Content. Objectionable Content includes, but is not
          limited to: (i) sexually explicit materials; (ii) obscene, defamatory,
          libelous, slanderous, violent and/or unlawful content or profanity;
          (iii) content that infringes upon the rights of any third party,
          including copyright, trademark, privacy, publicity or other personal
          or
          proprietary right, or that is deceptive or fraudulent; (iv) content
          that
          promotes the use or sale of illegal or regulated substances, tobacco
          products, ammunition and/or firearms; and (v) gambling, including
          without limitation, any online casino, sports books, bingo or poker.
          {'\n\n'}

          6. Warranty
          {'\n'}

          Chain React Photobomb disclaims all warranties about the Chain React
          Photobomb App to the fullest extent permitted by law. To the extent
          any
          warranty exists under law that cannot be disclaimed, Chain React
          Photobomb shall be solely responsible for such warranty.
          {'\n\n'}

          7. Maintenance and Support
          {'\n'}

          Chain React Photobomb does provide minimal maintenance or support for
          it
          but not to the extent that any maintenance or support is required by
          applicable law, Chain React Photobomb shall be obligated to
          furnish any such maintenance or support.
          {'\n\n'}

          8. Product Claims
          {'\n'}

          Chain React Photobomb is responsible for addressing any
          claims by you relating to the Chain React Photobomb App or use of it,
          including, but not limited to: (i) any product liability claim; (ii)
          any
          claim that the Chain React Photobomb App fails to conform to any
          applicable legal or regulatory requirement; and (iii) any claim
          arising
          under consumer protection or similar legislation. Nothing in this
          Agreement shall be deemed an admission that you may have such claims.
          {'\n\n'}

          9. Third Party Intellectual Property Claims
          {'\n'}

          Chain React Photobomb shall not be obligated to indemnify or defend
          you
          with respect to any third party claim arising out or relating to the
          Chain React Photobomb App. To the extent Chain React Photobomb is
          required to provide indemnification by applicable law, Chain React
          Photobomb, shall be solely responsible for the investigation,
          defense, settlement and discharge of any claim that the Chain React
          Photobomb App or your use of it infringes any third party intellectual
          property right.
        </Text>
      </ScrollView>
      <View style={styles.agreeContainer}>
        <Button style={styles.agreeButton} onPress={props.onAgree}>
          I AGREE
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 60,
    paddingHorizontal: 40,
    paddingVertical: 60
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10
  },
  text: {
    fontSize: 11
  },
  textWrapper: {
    backgroundColor: '#fff',
    padding: 12
  },
  agreeContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  agreeButton: {
    fontSize: 14
  }
});
