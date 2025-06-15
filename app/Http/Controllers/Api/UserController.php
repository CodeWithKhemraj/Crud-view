<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Route;

class UserController extends Controller
{
    // Get all users
    public function getUsers(){
        $getUsers = User::get();
        // $getUsers = compact('getUsers', [getUsers]);
        return view('welcome');
    }
}
