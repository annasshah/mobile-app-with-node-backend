import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

// "data": {
//   "user_id": "66817cd082042bb3ae88785c",
//   "image_url": "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
//   "title": "Post Title",
//   "description": "Post Description",
//   "views": 0,
//   "_id": "668183b44bbdbfcdb135aad3",
//   "createdAt": "2024-06-30T16:11:32.458Z",
//   "updatedAt": "2024-06-30T16:11:32.458Z",
//   "__v": 0
// }

export const Home = () => {

  // const authSlice = useSelector((state)=>state.auth)

  const [render_count, setRender_count] = useState(20)

  const randomData = [
    '1', '2', '3', '4', '5',
    '1', '2', '3', '4', '5',
    '1', '2', '3', '4', '5',
    '1', '2', '3', '4', '5',
    '1', '2', '3', '4', '5',
    '1', '2', '3', '4', '5',
    '1', '2', '3', '4', '5',
    '1', '2', '3', '4', '5',
  ]

  const reachEndHandle = () => {
    setTimeout(() => {
      setRender_count((pre_count)=>pre_count + 10)
    }, 5000);
    console.log('reached to end', render_count)
  }
  const on_refresh_call = () => {
    setRender_count((pre_count)=>10)
    console.log('Refreshed', render_count)
  }
  return (
    <View style={{paddingHorizontal:20, paddingVertical:15}}>
      

      <View>
      <FlatList
      ListHeaderComponent={ <View>
        <TouchableOpacity style={{paddingHorizontal:10, paddingVertical:15, backgroundColor:'#7cacf8',borderRadius:10}}>
          <Text style={{textAlign:'center', fontWeight:'bold', color:'white'}}>
            Create Post
          </Text>
        </TouchableOpacity>
      </View>}
      refreshControl={<RefreshControl onRefresh={on_refresh_call} refreshing={false} />
      }
      onEndReached={reachEndHandle}
        data={Array(render_count).fill('num')}
        renderItem={({item}, ind) =><Text style={{marginVertical:10, fontSize:20}}>{item}</Text> }

        ListFooterComponent={<View style={{paddingVertical:20, backgroundColor:'red'}}>
          <ActivityIndicator />
        </View>}
        keyExtractor={(item,ind) => ind}
      />

      </View>
      
    </View>
  )
}

