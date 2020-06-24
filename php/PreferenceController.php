<?php

namespace App\Http\Controllers\User;

use App\Bundle\Common;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserPreferenceResource;
use App\Preference;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PreferenceController extends Controller
{
    public function postPreference(Request $request)
    {
        $request->validate([
            'gender' => ['required', Rule::in(Common::GENDER_TYPES)],
            'looking' => ['required', Rule::in(Common::LOOKING_TYPES)],
            'age_range' => ['required', Rule::in(Common::AGE_RANGE)],
            'max_distance' => ['required', 'numeric', 'between:100,1000']
        ]);

        $data = $request->all();

        list($min, $max) = explode('-', $request->input('age_range'));

        $data['min_age'] = $min;
        $data['max_age'] = $max;

        /* @var $preference Preference */
        $preference = $request->user()->preference()
            ->updateOrCreate([], $data);

        return new UserPreferenceResource($preference);
    }

    public function getPreference(Request $request)
    {
        $preference = $request->user()->preference;

        return new UserPreferenceResource($preference);
    }
}
