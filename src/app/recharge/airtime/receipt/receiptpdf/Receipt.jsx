import React, { Fragment } from 'react'
import { Text, View, Page, StyleSheet, Document, PDFViewer, Image } from '@react-pdf/renderer';
import Brand from '../../../../asset/ajirobalogo.png'
import klausdwork from '../../../../asset/klausdwork@2x.png'


const Receipt = () => {

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
      height: 120
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


  });




    return (


    <View>
    <Page size="A4" style={styles.page}>


   <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>

        <Image style={styles.logo} src={Brand} />


            <Text style={styles.backbutton} >Back </Text>
        </View>

        <View>
          <Text style={styles.reportTitle}>Airtime Recharge</Text>

        </View>
      </View>
    </View>

    <View style={styles.contentcenter}>
      <View style={styles.flexcol}>
        <View>
          <Text style={styles.smalltext}>Transaction Amount </Text>
        </View>

        <View>
          <Text style={styles.boldtext}>N 700.00</Text>

        </View>
      </View>
    </View>




    </Page>
  </View>



    )
}


export default Receipt




