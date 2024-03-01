import React, { useEffect, useState } from 'react';
import logo from '../asset/logo.webp';
import moment from 'moment';
import axios from 'axios';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const BillPdf = ({ bill }) => {
  const styles = StyleSheet.create({
    flex: {
      display: 'flex',
    },
    itemscenter: {
      alignItems: 'center',
    },
    justifycenter: {
      justifyContent: 'center',
    },
    flexcol: {
      flexDirection: 'column',
    },
    mb6: {
      marginBottom: '15rem',
    },
    mb1: {
      marginBottom: '0.25rem',
    },
    textblue: {
      color: '#1e40af',
    },
    fontbold: {
      fontWeight: 'bold',
    },
    text2xl: {
      fontSize: '15rem',
  },
    mdtext3: {
    fontsize: '1875rem',
  },
    textgray: {
    color: '#4b5563',
  },
    textwhite: {
    color: '#fff',
  },
    textleft: {
    textAlign: 'left',
  },
    fontsemibold: {
    fontWeight: '600',
  },
    textsm: {
    fontsize: '0875rem',
  },
    uppercase: {
    textTransform: 'uppercase',
  },
    px6: {
    paddingLeft: '15rem',
    paddingRight: '15rem'
  },
    py4: {
    paddingTop: '1rem',
    paddingBottom: '1rem'
  },    page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  })

return (
  <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Bill To:</Text>
          <Text style={styles.text}>Name: {bill?.billFor === 'Contractor' ? bill?.contractor?.name : bill?.supplier?.name}</Text>
          <Text style={styles.text}>Site: {bill?.site?.name}</Text>
          <Text style={styles.text}>Date: {moment(bill?.dateOfBill).format('DD-MM-YYYY')}</Text>
          <Text style={styles.text}>Bill No: {bill ? `BHC/${bill?.site?.name}${bill?.billNo}` : '-'}</Text>
        </View>
        {/* Add more sections for other bill details */}
      </Page>
    </Document>
)
}

export default BillPdf