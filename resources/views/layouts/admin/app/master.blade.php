<!DOCTYPE html>
<html lang="en">

<head>
    <title>@yield('title')</title>
    @include('layouts.admin.app.meta')
    @include('layouts.admin.app.css')
    @yield('css')

</head>

<body>

    <div class="page-wrapper compact-wrapper" id="pageWrapper">

    <!-- header area -->
    @include('layouts.admin.app.header')
    <!-- header area end -->

     <div class="page-body-wrapper">


    <!-- sidebar-popup -->
    @include('layouts.admin.app.sidebar')
    <!-- sidebar-popup end -->


     {{-- <div class="page-body"> --}}
        <!-- Breadcrumb -->
        {{-- @yield('breadcrumbs') --}}
        <!-- / Breadcrumb -->

        @yield('content')
     {{-- </div> --}}



    <!-- footer area -->
    @include('layouts.admin.app.footer')
    <!-- footer area end -->

</div>
    </div>


    <!-- scroll-top -->
    <div class="tap-top"><i data-feather="chevrons-up"></i></div>
    <!-- scroll-top end -->


    <!-- js -->
    @include('layouts.admin.app.script')

</body>

</html>
