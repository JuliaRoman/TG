import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage"; 

export function TagRestricao({item}){

    const teste = "";
    async function retiraritem(teste){
        console.log(teste);
        await AsyncStorage.removeItem(teste);
    } 
    return (
        <View style = {styles.tag}>
            <Text style = {styles.txtTag} numberOfLines={5}>{item[1]}</Text>
            <TouchableOpacity style = {styles.btnFecha} onPress={() => retiraritem(item[0])}><Text style = {styles.txtFecha}>x</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    tag:{
        backgroundColor: '#6B6B6B',
        borderRadius: 50,
        height: 32,
        alignItems: 'center',
        width: 200,
        marginBottom: 10,
        marginRight: 5,
        textAlign:'left',
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        flexDirection: 'row',
        paddingLeft:20,
    },
    txtTag:{
        color: '#FFFFFF',
        fontSize: 16,
    },
    txtFecha:{
        color:'white',
        fontSize:15,
        alignItems: 'center',
        textAlign:'right',
        fontWeight:'600',
    },
    btnFecha:{
        position:"absolute",
        right:25,
    },
});