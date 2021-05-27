<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request) {
        $email = $request->email;
        $password = $request->password;

        //check if empty
        if(empty($email) or empty($password)){
             return response()->json(['status' => 'failed', 'message' => 'You must fill all the fields']);
        }

        $credentials = request(['email', 'password']);

        if(!$token = auth()->attempt($credentials)){
            return response()->json(['status' => "failed", 'message' => "Wrong credentials"], 401);
        }

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
                'expires_in' => auth()->factory()->getTTL() * 60
            ]
        ];
        return response()->json(['user' => $response, "status" => 200]);
    }

    public function register(Request $request){
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $role = $request->role;

        // Check if field is empty
        if (empty($name) or empty($email) or empty($password) or empty($role)) {
            return response()->json(['status' => 'failed', 'message' => 'You must fill all the fields']);
        }

        // Check if email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['status' => 'failed', 'message' => 'You must enter a valid email']);
        }

        // Check if password is greater than 5 character
        if (strlen($password) < 6) {
            return response()->json(['status' => 'failed', 'message' => 'Password should be min 6 character']);
        }

        // Check if user already exist
        if (User::where('email', '=', $email)->exists()) {
            return response()->json(['status' => 'failed', 'message' => 'User already exists with this email']);
        }

        // Create new user
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = app('hash')->make($request->password);
            $user->role = $role;

            if ($user->save()) {
                return $this->login($request);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'failed', 'message' => $e->getMessage()]);
        }
    }

    public function logout(){
        auth()->logout();
        return response()->json(['status' => 200 ,'message' => 'Successfully logged out']);
    }


    public function auth_check(){
        if( auth()->check() ){
            $user = auth()->user();
            $response = [
                'user'=>[
                    'id'=>$user->id,
                    'name'=>$user->name,
                    'email'=>$user->email,
                    'role'=>$user->role
                ],
                'token'=>[
                    'type'=>'Bearer',
                    'value'=> auth()->tokenById($user->id),
                    'expires_at'=> auth()->factory()->getTTL(),
                ]
            ];
            return response()->json(['user' => $response, 'status' => 200]);
        }
        return response()->json(['status' => "failed", 'message' => "Unauthorized"]);
    }



}
