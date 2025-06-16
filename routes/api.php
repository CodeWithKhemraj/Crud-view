<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

 
Route::resource('users', App\Http\Controllers\UserController::class)->only(['index','store','show', 'update','destroy']);