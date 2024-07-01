import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Signup } from '../../screens/Signup'
import { Login } from '../../screens/Login'
import { Home } from '../../screens/Home'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../assets/Loader'
import auth from "@react-native-firebase/auth"
import { authAction } from '../../store/slices/authSlice'
import { Create_Post } from '../../screens/Create_Post'
import { check_auth_service } from '../../services/auth_services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { save_tokens_constant } from '../../utils/constants'

const Stack = createNativeStackNavigator()
export const NavigationApp = () => {
  const authSlice = useSelector((state)=>state.auth)

  const dispatch = useDispatch()

  // const check_initial_auth =

  useEffect(() => {
    //  iife ----->
    ;( async () => {

      const auth_token = await AsyncStorage.getItem(save_tokens_constant)  || ''

     if(auth_token){
      try {
        const res = await check_auth_service()

        if(res.data){
          dispatch(authAction({auth:true, profile: res.data.data}))
        }
      } catch (error) {
        dispatch(authAction({auth:false, profile:null}))
      }
     }
     else{
      dispatch(authAction({auth:false, profile:null}))
     }
  
    })();


    // check_initial_auth()

    // auth().onAuthStateChanged((user)=>{
    //   console.log(user)
      
    //   if(user){
    //     dispatch(authAction({auth:true, profile: user}))
    //   }
    //   else{
    //     dispatch(authAction({auth:false, profile: null}))
    //   }
    // })
  }, [])
  

  

  return (
   authSlice.loading ? <Loader size='large' /> : <NavigationContainer>

       {authSlice.auth ? <Stack.Navigator >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Create-Post' component={Create_Post} />
        </Stack.Navigator> :
        <Stack.Navigator >
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>}
    </NavigationContainer>
  )
}



const styles = StyleSheet.create({})