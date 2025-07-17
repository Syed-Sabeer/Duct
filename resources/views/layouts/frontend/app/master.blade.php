<!DOCTYPE html>
<html lang="en">

<head>
    <title>@yield('title')</title>
    @include('layouts.frontend.app.meta')
    @include('layouts.frontend.app.css')
    @yield('css')

</head>

<body>

 <body class="counter-scroll popup-loader">
    <div class="wrapper">

        {{-- @include('layouts.frontend.app.preload') --}}

        @include('layouts.frontend.app.header')



  @yield('content')


        @include('layouts.frontend.app.footer')

      <!-- Go-top -->
        <div class="progress-wrap">
            <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style="transition: stroke-dashoffset 10ms linear; stroke-dasharray: 307.919, 307.919; stroke-dashoffset: 277.672;">
                </path>
            </svg>
        </div>
        <!-- /.go-top -->

</div>


</body>

</html>
