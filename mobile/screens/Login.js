
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import { authAction } from '../store/slices/authSlice'
import { login_service, signup_service } from '../services/auth_services'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { save_tokens_constant } from '../utils/constants'


export const Login = () => {

    const [data, setData] = useState({})
    const dispatch = useDispatch()

    const navigation = useNavigation()


    const on_change_handle = (field, value) => {

        setData((pre) => ({ ...pre, [field]: value }))

    }
    const submit_handle = async () => {

        console.log('running')


       try {
        const res =await login_service(data)

        if(res) {
            const access_token = res.data.access_token

            await AsyncStorage.setItem(save_tokens_constant, access_token)
            dispatch(authAction({auth:true, profile:null}))


        }

       console.log({res:res.data})
       
    } catch (error) {
           console.log({error})
        
       }


    }



    const goToSignupPage = () => {
        navigation.navigate('Signup')
    }




    return (
        <View style={styles.container}>

            <ScrollView style={{ gap: 20 }}>
                <View style={{marginVertical:20}}>
                <Text style={styles.title}>
                    Login
                </Text>
                </View>
                <View style={styles.input_container}>
                   <TextInput onChangeText={(e) => on_change_handle('email', e)} style={styles.input} placeholder='Enter email address' />
                    <TextInput onChangeText={(e) => on_change_handle('password', e)} style={styles.input} placeholder='Enter password' secureTextEntry={true} />
                </View>

                <TouchableOpacity  onPress={submit_handle} style={styles.button}>
                    <Text style={styles.button_text}>
                        Login
                    </Text>
                </TouchableOpacity>


                <View style={{marginTop:10, alignItems:'center', justifyContent:'center', gap:2}}>
                    <Text>
                        Already have account <TouchableOpacity onPress={goToSignupPage}>
                            <Text>
                                Signup Now
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 20,
        flex: 1,
        justifyContent: 'center',
        // alignItems:'center'

    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24
    },
    input_container: {
        gap: 20,

    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10
    },
    button: {
        marginTop:20,
        backgroundColor: '#7cacf8',
        paddingVertical: 15,
        borderRadius: 10

    },
    button_text: {
        textAlign: 'center',
        color: 'white'
    }
})





