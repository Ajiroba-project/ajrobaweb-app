import React, { Fragment } from 'react'
import { Text, View, Page, StyleSheet, Document, PDFViewer, Image } from '@react-pdf/renderer';
import Brand from '../../../../asset/ajirobalogo.png'
import klausdwork from '../../../../asset/klausdwork@2x.png'


const Receipt = ({dataone, datatwo}) => {

const styles = StyleSheet.create({

        page: {
      fontSize: 11,
      paddingLeft: 15,
      paddingRight: 15,

    },

    spaceBetween: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: "#3E3E3E"
    },

    contentcenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    smalltext:{
        color: '#A09F9F',
        fontSize: '10px'
    },

       boldtext: {
        color: '#2A2A2A',
         fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },


    flexcol: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerContainer:{
        backgroundColor: '#F6F6F6',
        marginBottom: 12,
        margintTop: 12

    },

    backbutton:{
        color: '#F25E26',
        marginBottom: 12
    },

    titleContainer: {
      flexDirection: 'row',
      marginTop: 24,
    },
    logo: {
      width: 120,

    },
    reportTitle: {
      fontSize: 14,
      textAlign: 'center',
      fontWeight: 600,

    },

    invoice: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    invoiceNumber: {
      fontSize: 11,
    },




     table: {
     /*  marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5, */
      padding: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  padding: 10,

    },
    label: {
      fontSize: 10,
      color: '#FF5722',
    },
    value: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000',
    },



    footer: {
      marginTop: 30,
      textAlign: 'center',
    },
    appButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    appButton: {
      margin: 5,
      padding: 10,
      backgroundColor: '#000',
      borderRadius: 5,
      textAlign: 'center',
      color: '#fff',
      fontSize: 10,
    },
    footerText: {
      fontSize: 8,
      color: '#aaa',
      marginTop: 10,
    },


  });




    return (


    <View>
    <Page size="A4" style={styles.page}>


   <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>

       {/*  <Image style={styles.logo} src={Brand} /> */}

    <Text style={styles.reportTitle}>Ajiroba</Text>
            <Text style={styles.backbutton} >Back </Text>
        </View>

        <View>
          <Text style={styles.reportTitle}>{dataone?.data?.message}</Text>

        </View>
      </View>
    </View>

    <View style={styles.contentcenter}>
      <View style={styles.flexcol}>
        <View>
          <Text style={styles.smalltext}>Transaction Amount </Text>
        </View>

        <View>
          <Text style={styles.boldtext}>N {datatwo?.amount}</Text>

        </View>
      </View>
    </View>


{/* Table Section */}
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Method</Text>
          <Text style={styles.value}>{dataone?.data?.payment_method || 'NA'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Customer Name</Text>
          <Text style={styles.value}>{datatwo?.payerName || 'NA'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{dataone?.data?.address || 'NA'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{datatwo?.phoneNumber || 'NA'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Disco</Text>
          <Text style={styles.value}>{datatwo?.disco || 'NA'}</Text>
        </View>

         <View style={styles.row}>
          <Text style={styles.label}>Reference</Text>
          <Text style={styles.value}>{dataone?.data?.reference || 'NA'}</Text>
        </View>


          <View style={styles.row}>
          <Text style={styles.label}>Meter Number</Text>
          <Text style={styles.value}>{datatwo?.customerId || 'NA'}</Text>
        </View>


 <View style={styles.row}>
          <Text style={styles.label}>Units</Text>
          <Text style={styles.value}>{dataone?.data?.disco_token || 'NA'}</Text>
        </View>


         <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>{datatwo?.amount || 'NA'}</Text>
        </View>

           <View style={styles.row}>
          <Text style={styles.label}>Tax Amount</Text>
          <Text style={styles.value}>{datatwo?.tax_amount || 'NA'}</Text>
        </View>

          <View style={styles.row}>
          <Text style={styles.label}>Total Payable</Text>
          <Text style={styles.value}>{datatwo?.total_payable || 'NA'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID</Text>
          <Text style={styles.value}>{dataone?.data?.id || 'NA'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date of Transaction</Text>
          <Text style={styles.value}>{dataone?.data?.date || 'NA'}</Text>
        </View>


      </View>

{/* Footer */}
      <View style={styles.footer}>
        <Text>Download our mobile App on:</Text>
        <View style={styles.appButtonContainer}>
          <Text style={styles.appButton}>Google Play Store</Text>
          <Text style={styles.appButton}>Apple Store</Text>
        </View>
        <Text style={styles.footerText}>
          This electronically generated receipt is provided for informational purposes only and is not a legally binding document.
        </Text>
      </View>
    </Page>
  </View>



    )
}


export default Receipt




