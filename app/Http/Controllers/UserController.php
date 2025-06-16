<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Client\ResponseSequence;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users =  User::get();
        return response()->json($users);
    }

    /**
     * Show the form for Userseating a new resource.
     */
    public function Userseate()
    {
        //
    }

    /**
     * Store a newly Userseated resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $users)
    {
        return response()->json($users);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $user = User::find($id);
        if(is_null($user)){
            return response()->json(['error' => 'User not found'], 404);
        }
        return $user;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $response = $user->update([
            'name' =>   $request->name ??  'khem',
            'email' =>  $request->email ?? 'khem@gmail.com' ,
        ]); 
        if($response == true){
            return response()->json(['message' => 'User Updated Successfully!!','user' => $user  ]);
        }else{
            return response()->json(['error' => 'Something went wrong' ]);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $users)
    {
        //
    }
}
