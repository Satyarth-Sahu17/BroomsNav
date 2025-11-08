package com.runanywhere.startup_hackathon20

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Bundle
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast

class MainActivity : Activity() {
    
    private lateinit var webView: WebView
    
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Create WebView programmatically
        webView = WebView(this)
        setContentView(webView)
        
        // Enable WebView debugging
        WebView.setWebContentsDebuggingEnabled(true)
        
        // Configure WebView settings
        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true
        webSettings.databaseEnabled = true
        webSettings.allowFileAccess = true
        webSettings.allowContentAccess = true
        webSettings.loadWithOverviewMode = true
        webSettings.useWideViewPort = true
        webSettings.builtInZoomControls = false
        webSettings.displayZoomControls = false
        webSettings.setSupportZoom(true)
        webSettings.cacheMode = WebSettings.LOAD_DEFAULT
        
        // Enable geolocation if needed
        webSettings.setGeolocationEnabled(true)
        
        // Set WebViewClient to handle page navigation
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                return false
            }
            
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                android.util.Log.d("BroomNav", "Page loaded: $url")
            }
        }
        
        // Set WebChromeClient to capture console logs
        webView.webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(message: ConsoleMessage): Boolean {
                android.util.Log.d("BroomNav-JS", "${message.message()} -- From line ${message.lineNumber()} of ${message.sourceId()}")
                return true
            }
        }
        
        // Add JavaScript interface for Kotlin-JS communication
        webView.addJavascriptInterface(AndroidBridge(), "Android")
        
        // Load the login page from assets
        webView.loadUrl("file:///android_asset/login.html")
    }
    
    // JavaScript Interface for communication between Kotlin and WebView
    inner class AndroidBridge {
        
        @JavascriptInterface
        fun showToast(message: String) {
            runOnUiThread {
                Toast.makeText(this@MainActivity, message, Toast.LENGTH_SHORT).show()
            }
        }
        
        @JavascriptInterface
        fun log(message: String) {
            android.util.Log.d("BroomNav", message)
        }
        
        @JavascriptInterface
        fun getAppVersion(): String {
            return "1.0.0"
        }
    }
    
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
    
    override fun onDestroy() {
        super.onDestroy()
        webView.destroy()
    }
}
