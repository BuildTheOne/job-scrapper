import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:job_scrapper/job.dart';

Future<List<Job>> fetchJobs() async {
  final response = await http
      .get(Uri.parse('https://job-scrapper-alpha.vercel.app/api/job'));

  if (response.statusCode == 200) {
    final body = (jsonDecode(response.body) as Map<String, dynamic>);
    var result = (body['data'] as List<dynamic>)
        .map((job) => Job.fromJson(job))
        .toList();
    return result;
  } else {
    throw Exception('Failed to load jobs');
  }
}
