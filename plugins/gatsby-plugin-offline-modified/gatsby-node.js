"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var fs = require("fs");

var workboxBuild = require("workbox-build");

var path = require("path");

var slash = require("slash");

var _ = require("lodash");

var getResourcesFromHTML = require("./get-resources-from-html");

exports.createPages = function (_ref) {
  var actions = _ref.actions;

  if (process.env.NODE_ENV === "production") {
    var createPage = actions.createPage;
    createPage({
      path: "/offline-plugin-app-shell-fallback/",
      component: slash(path.resolve(__dirname + "/app-shell.js"))
    });
  }
};

var s;

var readStats = function readStats() {
  if (s) {
    return s;
  } else {
    s = JSON.parse(fs.readFileSync(process.cwd() + "/public/webpack.stats.json", "utf-8"));
    return s;
  }
};

var getAssetsForChunks = function getAssetsForChunks(chunks) {
  var files = _.flatten(chunks.map(function (chunk) {
    return readStats().assetsByChunkName[chunk];
  }));

  return _.compact(files);
};

exports.onPostBuild = function (args, pluginOptions) {
  var pathPrefix = args.pathPrefix;
  var rootDir = "public"; // Get exact asset filenames for app and offline app shell chunks

  var files = getAssetsForChunks(["app", "webpack-runtime", "component---node-modules-gatsby-plugin-offline-app-shell-js"]); // Remove the custom prefix (if any) so Workbox can find the files.
  // This is added back at runtime (see modifyUrlPrefix) in order to serve
  // from the correct location.

  var omitPrefix = function omitPrefix(path) {
    return path.slice(pathPrefix.length);
  };

  var criticalFilePaths = _.uniq(_.concat(getResourcesFromHTML(process.cwd() + "/" + rootDir + "/404.html"), getResourcesFromHTML(process.cwd() + "/" + rootDir + "/offline-plugin-app-shell-fallback/index.html"))).map(omitPrefix);

  var globPatterns = files.concat(["offline-plugin-app-shell-fallback/index.html"].concat(criticalFilePaths));
  var manifests = ["manifest.json", "manifest.webmanifest"];
  manifests.forEach(function (file) {
    if (fs.existsSync(rootDir + "/" + file)) globPatterns.push(file);
  });
  var options = {
    importWorkboxFrom: "local",
    globDirectory: rootDir,
    globPatterns: globPatterns,
    modifyUrlPrefix: {
      // If `pathPrefix` is configured by user, we should replace
      // the default prefix with `pathPrefix`.
      "/": pathPrefix + "/"
    },
    cacheId: "gatsby-plugin-offline",
    // Don't cache-bust JS or CSS files, and anything in the static directory,
    // since these files have unique URLs and their contents will never change
    dontCacheBustUrlsMatching: /(\.js$|\.css$|static\/)/,
    runtimeCaching: [{
      // Use cacheFirst since these don't need to be revalidated (same RegExp
      // and same reason as above)
      urlPattern: /(\.js$|\.css$|static\/)/,
      handler: "cacheFirst"
    }, {
      // Add runtime caching of various other page resources
      urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
      handler: "staleWhileRevalidate"
    }, {
      // Google Fonts CSS (doesn't end in .css so we need to specify it)
      urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
      handler: "staleWhileRevalidate"
    }],
    skipWaiting: true,
    clientsClaim: true // pluginOptions.plugins is assigned automatically when the user hasn't
    // specified custom options - Workbox throws an error with unsupported
    // parameters, so delete it.

  };
  delete pluginOptions.plugins;

  var combinedOptions = _.defaults(pluginOptions, options);

  var idbKeyvalFile = "idb-keyval-iife.min.js";

  var idbKeyvalSource = require.resolve("idb-keyval/dist/" + idbKeyvalFile);

  var idbKeyvalDest = "public/" + idbKeyvalFile;
  fs.createReadStream(idbKeyvalSource).pipe(fs.createWriteStream(idbKeyvalDest));
  var swDest = "public/sw.js";
  return workboxBuild.generateSW((0, _extends2.default)({
    swDest: swDest
  }, combinedOptions)).then(function (_ref2) {
    var count = _ref2.count,
        size = _ref2.size,
        warnings = _ref2.warnings;
    if (warnings) warnings.forEach(function (warning) {
      return console.warn(warning);
    });
    var swAppend = fs.readFileSync(__dirname + "/sw-append.js", "utf8").replace(/%pathPrefix%/g, pathPrefix);
    var swCustom = "/*No user file*/";

    if (fs.existsSync(process.cwd() + "/gatsby-sw.js")) {
      swCustom = fs.readFileSync(process.cwd() + "/gatsby-sw.js", "utf8");
    }

    fs.appendFileSync("public/sw.js", "\n" + swAppend + "\n /* -- User File Starts --*/ \n" + swCustom);
    console.log("Generated " + swDest + ", which will precache " + count + " files, totaling " + size + " bytes.");
  });
};