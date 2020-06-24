<?php

namespace App\Http\Controllers\User;

use App\Bundle\Common;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserProfileResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function getMe(Request $request)
    {
        return new UserResource($request->user()->load('profile', 'preference'));
    }

    public function postMe(Request $request)
    {
        $rules = [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'nickname' => ['required', 'string', 'max:100'],
            'gender' => ['required', Rule::in(Common::GENDER_TYPES)],
            'dob' => ['required', 'date_format:d/m/Y', 'before_or_equal:-18 years'],
            'location' => ['required', 'string', 'max:150'],
            'occupation' => ['required', 'string', 'max:150'],
            'education' => ['required', 'string', 'max:100']
        ];

        $request->validate($rules);

        $profile = $request->user()->profile()
            ->updateOrCreate([], $request->only(array_keys($rules)));

        return new UserProfileResource($profile);
    }
}
