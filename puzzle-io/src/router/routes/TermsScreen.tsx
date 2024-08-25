import MapStatusBar from '@/components/header/MapStatusBar';
import { layoutStyles } from '@/styles/layoutStyles';
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <View style={layoutStyles.container}>
      <MapStatusBar backTo="WorldMapScreen" />
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text style={styles.date}>Last Updated: 25-08-2024</Text>

        <Text style={styles.sectionHeading}>Introduction</Text>
        <Text style={styles.text}>
          Orion's puzzle ("we," "our," or "us") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you use our mobile game ("the
          Game"). Please read this Privacy Policy carefully. By accessing or
          using the Game, you agree to the terms of this Privacy Policy.
        </Text>

        <Text style={styles.sectionHeading}>Information We Collect</Text>

        <Text style={styles.subHeading}>1. Personal Information</Text>
        <Text style={styles.text}>
          We may collect personal information that you provide directly to us
          when you register for the Game, such as your name, email address, and
          any other information you choose to provide.
        </Text>

        <Text style={styles.subHeading}>
          2. Automatically Collected Information
        </Text>
        <Text style={styles.text}>
          When you use the Game, we may automatically collect certain
          information about your device, including your IP address, device type,
          operating system, and usage statistics (e.g., gameplay duration,
          in-app purchases, etc.).
        </Text>

        <Text style={styles.subHeading}>3. Third-Party Information</Text>
        <Text style={styles.text}>
          We may receive information about you from third parties, such as
          social media platforms, when you link your account to the Game.
        </Text>

        <Text style={styles.sectionHeading}>How We Use Your Information</Text>
        <Text style={styles.text}>
          We may use the information we collect from you to:
        </Text>
        <Text style={styles.bulletPoint}>
          • Provide, operate, and maintain the Game.
        </Text>
        <Text style={styles.bulletPoint}>
          • Improve, personalize, and expand the Game.
        </Text>
        <Text style={styles.bulletPoint}>
          • Understand and analyze how you use the Game.
        </Text>
        <Text style={styles.bulletPoint}>
          • Develop new features, products, or services.
        </Text>
        <Text style={styles.bulletPoint}>
          • Communicate with you, either directly or through one of our
          partners, including for customer service, updates, and promotional
          purposes.
        </Text>
        <Text style={styles.bulletPoint}>
          • Process your transactions and manage your orders.
        </Text>
        <Text style={styles.bulletPoint}>
          • Prevent fraud and protect the security of the Game.
        </Text>
        <Text style={styles.bulletPoint}>• Comply with legal obligations.</Text>

        <Text style={styles.sectionHeading}>Sharing Your Information</Text>
        <Text style={styles.text}>We may share your information with:</Text>
        <Text style={styles.bulletPoint}>
          • <Text style={styles.boldText}>Service Providers:</Text> Third-party
          companies and individuals that assist us in providing the Game, such
          as hosting services, data analysis, customer service, and marketing.
        </Text>
        <Text style={styles.bulletPoint}>
          • <Text style={styles.boldText}>Business Transfers:</Text> If we
          undergo a merger, acquisition, or asset sale, your information may be
          transferred as part of that transaction.
        </Text>
        <Text style={styles.bulletPoint}>
          • <Text style={styles.boldText}>Legal Requirements:</Text> If required
          by law or in response to valid requests by public authorities, such as
          a court or government agency.
        </Text>

        <Text style={styles.sectionHeading}>Security of Your Information</Text>
        <Text style={styles.text}>
          We use reasonable measures to protect your information from
          unauthorized access, use, or disclosure. However, no method of
          transmission over the internet or electronic storage is completely
          secure, so we cannot guarantee its absolute security.
        </Text>

        <Text style={styles.sectionHeading}>Your Choices</Text>
        <Text style={styles.text}>
          You can choose not to provide certain information, but this may affect
          your ability to use some features of the Game. You may also request to
          update, correct, or delete your personal information by contacting us
          at support@webstart.solutions .
        </Text>

        <Text style={styles.sectionHeading}>Children's Privacy</Text>
        <Text style={styles.text}>
          Our Game is not intended for children under the age of 13, and we do
          not knowingly collect personal information from children under 13. If
          we become aware that we have inadvertently collected personal
          information from a child under 13, we will take steps to delete such
          information as soon as possible.
        </Text>

        <Text style={styles.sectionHeading}>
          Changes to This Privacy Policy
        </Text>
        <Text style={styles.text}>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page and
          updating the "Last Updated" date above. Your continued use of the Game
          after the changes have been made will constitute your acceptance of
          the new Privacy Policy.
        </Text>

        <Text style={styles.sectionHeading}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </Text>
        <Text style={styles.contactInfo}>
          Karel Bohac{'\n'}
          Brno, Czech Republic{'\n'}
          support@webstart.solutions
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#444',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginLeft: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  contactInfo: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginTop: 10,
  },
});

export default PrivacyPolicy;
