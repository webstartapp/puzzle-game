import MapStatusBar from '@/components/header/MapStatusBar';
import { licenses } from '@/config/licenses';
import { layoutStyles } from '@/styles/layoutStyles';
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const CreditScreen = () => {
  return (
    <View style={layoutStyles.container}>
      <MapStatusBar backTo="WorldMapScreen" />
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Credits</Text>

        {licenses.map((license, index) => (
          <View
            key={index}
            style={styles.licenseContainer}
          >
            <Text style={styles.title}>{license.title}</Text>

            <Text style={styles.subHeading}>Sources:</Text>
            {license.sources.map((source, sourceIndex) => (
              <Text
                key={sourceIndex}
                style={styles.sourceText}
              >
                • {source}
              </Text>
            ))}

            <Text style={styles.subHeading}>License:</Text>
            <Text style={styles.licenseText}>{license.license}</Text>

            <Text style={styles.subHeading}>Disclaimer:</Text>
            <Text style={styles.disclaimerText}>{license.disclaimer}</Text>
          </View>
        ))}
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
    marginBottom: 20,
    color: '#333',
  },
  licenseContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#444',
  },
  sourceText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginLeft: 10,
  },
  licenseText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default CreditScreen;
