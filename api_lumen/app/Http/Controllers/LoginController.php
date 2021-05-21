<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    //
    public function login(Request $request) {
        $credentials = $request->only(['email', 'password']);

        if($token =  auth()->attempt($credentials)){
            $user = auth()->user();
            $response = [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role
                ],
                'token' => [
                    'type' => 'Bearer',
                    'value' => $token,
                    'expires_at' => auth()->guard()->factory()->getTTL()
                ]
            ];
            return response()->json(['user' => $response, "error" => false]);
        }
        return response()->json(['user' => [], "error" => true, "message" => "Invalid credentials"]);
    }

    public function logout(Request $request) {

    }
}
